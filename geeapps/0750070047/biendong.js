var anh2015 = ui.import && ui.import("anh2015", "image", {
      "id": "projects/khoaluan-0750070047/assets/anhgiaidoan2015"
    }) || ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2015"),
    anh2020 = ui.import && ui.import("anh2020", "image", {
      "id": "projects/khoaluan-0750070047/assets/anhgiaidoan2021"
    }) || ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021"),
    khuvuc = ui.import && ui.import("khuvuc", "table", {
      "id": "projects/khoaluan-0750070047/assets/huyenvinhcuu"
    }) || ee.FeatureCollection("projects/khoaluan-0750070047/assets/huyenvinhcuu");
// ----------------XAY DUNG GIAO DIEN-----------------------
//ui.Panel
var panel = ui.Panel ({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width:'400px',
    backgroundColor: '90EE90'
    }
} );
// 1- right , 0-left
ui.root.insert(1,panel);
//------------- Ket qua phan loai rung 1995-2022----------------
//---------------------khai báo khu vực thực hiện------------------------
var khuvuc = ee.FeatureCollection("projects/khoaluan-0750070047/assets/huyenvinhcuu").geometry();
// Di chuyển bản đồ nền đến khu vực thực hiện
Map.centerObject(khuvuc,11);
var viz = {
  min: 1,
  max:4,
  palette: ['0000FF','FF0000','FFFF00','00FF00']
} 
var anh2015 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2015").visualize(viz);
var    anh2021 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021").visualize(viz); 
Map.addLayer(anh2015,{},'2015')   ; 
Map.addLayer(anh2021,{},'2021')   ; 
//-------------- chen thumbnail vao panel--------------------
var name_1 = ui.Label('Bản đồ biến động năm 2015 - 2021',{
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight:'bold',
  fontSize:'18px'
});
panel.add(name_1);
// tạo mảng
var list = [anh2015,anh2021,anh2015,anh2021,anh2015,anh2021,];
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
var name_2 = ui.Label('Biểu đồ thống kê diện tích lớp phủ năm 2015 - 2021',{
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight:'bold',
  fontSize:'18px'
});
panel.add(name_2);    
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
  var names = ['ID_1 mặt nước', 'ID_2 đất trống','ID_3 Công Trình Xây Dựng','ID_4 thực vật'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
  });
// Add the legend to the map.
Map.add(legend);
// panel.add(legend)