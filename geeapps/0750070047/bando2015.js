// var anh2021 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021");
// Map.centerObject(khuvuc,11);
// // ----------------XAY DUNG GIAO DIEN-----------------------
//ui.Panel
var khuvuc = ee.FeatureCollection("projects/ee-khoaluantonghiep/assets/huyenvinhcuu");
Map.addLayer(khuvuc, {color: 'blue'}, 'Huyện Vĩnh Cửu', 0);
var panel = ui.Panel ({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width:'400px',
    border:'5px solid green'
  // backgroundColor: '90EE90'
    }
} );
// 1- right , 0-left
ui.root.insert(1,panel);
var khuvuc = ee.FeatureCollection("projects/khoaluan-0750070047/assets/huyenvinhcuu").geometry();
// Di chuyển bản đồ nền đến khu vực thực hiện
Map.centerObject(khuvuc,11);
var viz = {
  min: 1,
  max:4,
  palette: ['0000FF','FF0000','FFFF00','00FF00']
} 
var anh2015 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2015").visualize(viz); 
Map.addLayer(anh2015,{},'ảnh giải đoán có kiểm định 2015')   ; 
//-------------- chen thumbnail vao panel--------------------
var name_1 = ui.Label('Bản đồ lớp phủ huyện Vĩnh Cửu tỉnh Đồng Nai năm 2015',{
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight:'bold',
  fontSize:'18px',
//  backgroundColor: '90EE90',
  backgroundColor: '006400',
color:'ffffff',
   padding:'5px 10px 5px 15px ',
    margin: '10px 5px'  ,
});
panel.add(name_1);
// tạo mảng
var list = [anh2015];
// Tạo tập ảnh
var collection_img =ee.ImageCollection.fromImages(list);
// Tạo thumbnail
// Khai báo params
var params_thumbnail={
  dimensions:'600',//Kích thước tối đa của hình thu nhỏ để hiển thị
  region:khuvuc,// sua khu vuc nghien cuu
  framesPerSecond: 0.5//The framerate of the exported video. Must be a value between 0.1 and 100. Defaults to 1
};
var style_thumbnail={
  position:'bottom-right',
  width:'250px',
  margin:'auto'
  };
// 
//ui.Thumbnail(image, params, onClick, style)
var thumbmail =  ui.Thumbnail({
  image: collection_img,
  params: params_thumbnail,
  style: style_thumbnail
}
  );
  // hiển thị thumbnail
// Map.add(thumbmail);
  panel.add(thumbmail);
// 
var name_2 = ui.Label('Diện tích lớp phủ năm 2015',
{
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight:'bold',
  fontSize:'18px',
backgroundColor: '006400',
color:'ffffff',
   padding:'5px 10px 5px 15px ',
    margin: '10px 5px'   ,
});
panel.add(name_2); 
///////////////////////////////////////////////////////////////////////////////////////////////////
//dong 1
var line1=ui.Label({
  value: '______________________________________________________',
  style: { 
    padding:'1px 20px ',//T-R-B-L
    margin: '1px 1px'  ,
    },});
panel.add(line1)
var kc = ui.Label({
  value: "  ",
    style: {margin:'0px 10px 0px 2px', width:'100px',  }});
var table1=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table1.add(ui.Label({value: 'Đối tượng',style: {  fontWeight: 'bold',margin:'1px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
table1.add(kc); 
table1.add(ui.Label({value: 'Diện tích (ha)',style: {fontWeight: 'bold',margin:'1px 0px 0px 2px'}}));
panel.add(table1)
// dong 2
var line2=ui.Label({
  value: '______________________________________________________',
  style: { 
    padding:'1px 20px ',
    margin: '1px 1px 1px 1px'  ,
    },});
panel.add(line2)
var kc = ui.Label({
  value: "  ",
    style: {margin:'0px 10px 0px 2px', width:'110px',  }});
var table2=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table2.add(ui.Label({value: 'Thực vật',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
table2.add(kc); 
table2.add(ui.Label({value: '79772.843',style: {margin:'0px 0px 0px 2px'}}));
panel.add(table2)
// dong 3
var line3=ui.Label({
  value: '______________________________________________________',
  style: { 
    padding:'1px 20px  ',
    margin: '1px 1px'  ,
    },});
panel.add(line3)
var kc = ui.Label({
  value: "  ",
    style: {margin:'0px 10px 0px 2px', width:'110px',  }});
var table3=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table3.add(ui.Label({value: 'Mặt nước',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
table3.add(kc); 
table3.add(ui.Label({value: '11586.053',style: {margin:'0px 0px 0px 2px'}}));
panel.add(table3)
//dong 4
var line4=ui.Label({
  value: '______________________________________________________',
  style: { 
    padding:'1px 20px  ',
    margin: '1px 1px'  ,
    },});
panel.add(line4)
var kc = ui.Label({
  value: "  ",
    style: {margin:'0px 10px 0px 2px', width:'110px',  }});
var table4=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table4.add(ui.Label({value: 'Đất trống',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
table4.add(kc); 
table4.add(ui.Label({value: '545.056',style: {margin:'0px 0px 0px 2px'}}));
panel.add(table4)
//dong 5
var line5=ui.Label({
  value: '______________________________________________________',
  style: { 
    padding:'1px 20px ',
    margin: '1px 1px'  ,
    },});
panel.add(line5)
var kc = ui.Label({
  value: "  ",
    style: {margin:'0px 10px 0px 2px', width:'45px',  }});
var table5=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table5.add(ui.Label({value: 'Công trình xây dựng',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
table5.add(kc); 
table5.add(ui.Label({value: '17533.722',style: {margin:'0px 0px 0px 2px'}}));
panel.add(table5)
var line6=ui.Label({
  value: '______________________________________________________',
  style: { 
    padding:'1px 20px  ',
    margin: '1px 1px'  ,
    },});
panel.add(line6)
/*
var cot1_dong1 = ui.Label({
  value: "Công trình xây dựng",
    style: {margin:'0px 10px 0px 2px'  }});
var dong2 = ui.Label({
  value: 'Diện tích (ha)',
  style: {margin:'0px 10px 0px 2px'  }});  
var name_4 = ui.Label('Công Trình Xây Dựng : 17533 ha',
{
  stretch: 'horizontal',
  textAlign: 'left',
  fontWeight:'bold',
  fontSize:'18px'
}); 
panel.add(name_4); 
*/
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '20px 40px',
    color:'black',
      }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'CHÚ THÍCH',
  style: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0', 
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '10px',
      margin: '0 0 4px 0',
        }});
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'},
    });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Get the list of palette colors and class names from the image.
anh2015.toDictionary().evaluate(function(result) {
  var palette =['0000FF','FF0000','FFFF00','00FF00'];
  var names = ['Mặt Nước', 'Đất Trống','Công Trình Xây Dựng','Thực Vật'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
  });
// Add the legend to the map.
Map.add(legend);
// panel.add(legend)
var khuvuc = ee.FeatureCollection("projects/ee-khoaluantonghiep/assets/huyenvinhcuu");
var imageCollection=ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
          .filterDate('2015-01-01','2015-12-30')
        //  .filter(ee.Filter.bounds(vn_huyen))
        // .filter(ee.Filter.lt('CLOUD_COVER',10));
//print(imageCollection)         
// thiết lập màu               
var pallete = { bands: ['B4', 'B3', 'B2'], // tổ hợp màu
min: 0, //xác định biên độ của phổ màu
max: 0.4,
gamma: 1.2 // xác định bảng màu dùng để hiển thị
};
// loc trung binh + cat anh
var image=imageCollection.median().clip(khuvuc)
Map.addLayer(image,pallete, 'LANDSAT 8',0);
Map.centerObject(khuvuc,12);
var NDVI_2015 = image.normalizedDifference(['B5','B4']).rename('NDVI được chọn');
var viz = {
  min: -1 ,
  max: 1 ,
  palette: [
'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
'66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
'012E01', '011D01', '011301'
],
};
Map.addLayer(NDVI_2015, viz,'Ảnh NDVI huyện Vĩnh Cửu 2015',0);
var min = ee.Number(NDVI_2015.reduceRegion({
reducer: ee.Reducer.min(),
geometry: khuvuc,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, 'MIN OF NDVI_2015 ');
var max = ee.Number(NDVI_2015.reduceRegion({
reducer: ee.Reducer.max(),
geometry: khuvuc,
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'MAX OF NDVI_2015');
var inspector2015 = ui.Panel({ 
  style: {
    position: 'top-left',
    padding: '3px 3px',
    color:'black',
      }
});
// Add a label to the panel.
// inspector2015.add(ui.Label('Chọn 1 điểm để hiển thị NDVI năm 2015 ', {color: 'red'}));// *************  sua ****************
// // Add the panel to the default map.
// Map.add(inspector2015);
// Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector2015.clear();
  inspector2015.style().set('shown', true);
  inspector2015.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = NDVI_2015.reduce(ee.Reducer.mean());// *************  sua biến VV thành biến khai báo chỉ số ****************
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('mean');
print(computedValue,"kết quả chỉ số NDVI 2015");// *************  sua VV****************
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector2015.clear();
    // Add a label with the results from the server.
    inspector2015.add(ui.Label({
      value: 'Kết quả chỉ số NDVI năm 2015: ' + result.toFixed(2),// *************  sua MEAN VV****************
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector2015.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector2015.style().set('shown', false);
      }
    }));
  });
});
function classify(index){
  return NDVI_2015.expression(
    'b(0) < 0.05   ? 1'+//  <0.05// mặt nước,
    ': b(0) < 0.12   ? 2'+ // 0.05 -0.12 // đất trống
    // ': b(0) < 0.31 ? 3'+ // 0.12-0.31// đất khác
    ': b(0) < 0.5 ? 3'+ // 0.31-0.38// CTXayDung
    ': b(0) >= 0.5 ? 4'+ // 0.38// rung trong
                ': 0');  }
var classify_img = classify(NDVI_2015 ).clip(khuvuc);     
var viz = {
  min: 1,
  max:4,
  palette: ['0000FF','FF0000','FFFF00','00FF00']
}
Map.addLayer(classify_img,viz,'ảnh giải đoán có kiểm định năm 2015',1);
var names = ['ID_1 mặt nước', 'ID_2 đất trống','ID_3 Công Trình Xây Dựng','ID_5 thực vật'];// sua ten doi tuong
var count = classify_img.eq([1,2,3,4]).rename(names);// sua ten bien (dung phan loai)
var total = count.multiply(ee.Image.pixelArea()).divide(100*100);
var title = ui.Label(' Bản đồ lớp phủ huyện Vĩnh Cửu tỉnh Đồng Nai năm 2015', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '25px',
  color: 'FF0000',
});
Map.add(title);
// var names = ['ID_1 mặt nước', 'ID_2 đất trống','ID_3 Công Trình Xây Dựng','ID_4 thực vật'];// sua ten doi tuong
// var count = classify_img.eq([1,2,3,4]).rename(names);// sua ten bien (dung phan loai)
// var total = count.multiply(ee.Image.pixelArea()).divide(100*100);
// var area = total.reduceRegion({
// reducer:ee.Reducer.sum(),
// geometry:khuvuc,// khu vuc nghien cuu
//   scale:100,
// maxPixels: 1e11,
// bestEffort:true,
// });
// var area_forest = ee.Number(area);  
// print ('DIEN TICH RỪNG (hecta):', area_forest); 
// Biểu đồ
// var piechart = ui.Chart.image
//     .regions({
//       image: total,
//       regions: khuvuc,// sửa khu vực nghien cuu
//       reducer: ee.Reducer.sum(),
//       scale: 100,
//     })
//     .setChartType('PieChart').setOptions({
//       width: 250,
//       height: 350,
//       title: 'biểu đồ diện tích năm 2021 (hecta)',
//       is3D: true,
//       colors: ['0000FF','FF0000','FFFF00','00FF00']
//     });             
// //print ('Area in hecta:', chart);  
// //
// var chart = ui.Panel(
//   {
//   style: {
//     position:'bottom-left',
//     width:'300px',
//   }
//   }
//   );
//   chart.add(piechart);
//   Map.add(chart);
var img = ee.Image.pixelLonLat().multiply(100.0);
img = img.subtract(img.floor()).lt(0.05);
var grid = img.select('latitude').or(img.select('longitude'));
Map.addLayer(grid.updateMask(grid),{min: 0, max: 1, palette: '008000'}, 'GRID',0);
/*
var composite1 = imageCollection.median();
var composite = composite1.clip(khuvuc);
Map.addLayer(composite);
var newfc = DatTrong.merge(CTXayDung).merge(Thucvat).merge(Nuoc);
print(newfc, 'newfc');
var bands = ['B4','B3','B2'];
var training = composite.select(bands).sampleRegions({
  collection: newfc,
  properties: ['landcover'],
  scale: 30
});
print(training);
var withRandom = training.randomColumn('random');
var split = 0.7;
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));
var classifier = ee.Classifier.smileCart().train({
  features: trainingPartition,
  classProperty: 'landcover',
  inputProperties: bands
});
var classified = composite.select(bands).classify(classifier);
var palette = [
  '#d04110',
  '#ffc82d',
  '#98ff00',
  '#00ffff',
];
Map.addLayer(classified, {min: 1, max: 4, palette: palette}, 'Ảnh giải đoán có kiểm định năm 2021',0);
var trainAnccuracy = classifier.confusionMatrix();
print('Matrix', trainAnccuracy);
// print('',trainAnccuracy.accuracy(),0);
// print('Data before classification', testingPartition);
var test = testingPartition.classify(classifier);
// print('The classified set', test);
var confusionMatrix = test.errorMatrix('landcover', 'classification');
print('Confusion Matrix', confusionMatrix);
print('Độ chính xác toàn cục: ', confusionMatrix.accuracy());
// print ('kappa', classifier.confusionMatrix().kappa());
// var img = ee.Image.pixelLonLat().multiply(100.0);
// img = img.subtract(img.floor()).lt(0.05);
// var grid = img.select('latitude').or(img.select('longitude'));
// Map.addLayer(grid.updateMask(grid),{min: 0, max: 1, palette: '008000'}, 'GRID',0);
// var composite1 = dataset.median();
// var composite = composite1.clip(khuvuc);
// Map.addLayer(composite, trueColor432Vis, 'Huyện Vĩnh Cửu năm 2015',1);
// var newfc = DatTrong.merge(Nuoc).merge(CTXayDung).merge(Thucvat);
// print(newfc, 'newfc');
// var bands = ['B5','B4','B3'];
// var training = composite.select(bands).sampleRegions({
//   collection: newfc,
//   properties: ['landcover'],
//   scale: 30
// });
// print(training);
// var withRandom = training.randomColumn('random');
// var split = 0.7;
// var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
// var testingPartition = withRandom.filter(ee.Filter.gte('random', split));
// var classifier = ee.Classifier.smileCart().train({
//   features: trainingPartition,
//   classProperty: 'landcover',
//   inputProperties: bands
// });
// var classified = composite.select(bands).classify(classifier);
// var palette = [
// '#ff0000',
//   '#0002ff',
//   '#f5ff00',
//   '#21ff00'
// ];
// Map.addLayer(classified, {min: 1, max: 4, palette: palette}, 'Giải đoán có kiểm định năm 2015');
// var trainAnccuracy = classifier.confusionMatrix();
// print('Matrix', trainAnccuracy);
// print('Training overall accuracy:', trainAnccuracy.accuracy());
// print('Data before classification', testingPartition);
// var test = testingPartition.classify(classifier);
// print('The classified set', test);
// var confusionMatrix = test.errorMatrix('landcover', 'classification');
// print('Confusion Matrix', confusionMatrix);
// print('Validation: ', confusionMatrix.accuracy());
// print ('kappa', classifier.confusionMatrix().kappa());
*/