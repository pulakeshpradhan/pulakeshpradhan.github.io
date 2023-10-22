var anh2015 = ui.import && ui.import("anh2015", "image", {
      "id": "projects/khoaluan-0750070047/assets/anhgiaidoan2015"
    }) || ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2015"),
    anh2020 = ui.import && ui.import("anh2020", "image", {
      "id": "projects/khoaluan-0750070047/assets/anhgiaidoan2021"
    }) || ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021"),
    khuvuc = ui.import && ui.import("khuvuc", "table", {
      "id": "projects/khoaluan-0750070047/assets/huyenvinhcuu"
    }) || ee.FeatureCollection("projects/khoaluan-0750070047/assets/huyenvinhcuu"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                106.76691430719144,
                11.541372364133514
              ],
              [
                106.76691430719144,
                10.904230411317466
              ],
              [
                107.40274804742582,
                10.904230411317466
              ],
              [
                107.40274804742582,
                11.541372364133514
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            107.04706567437894,
            11.301767587272092
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                106.76691430719144,
                11.541372364133514
              ],
              [
                106.76691430719144,
                10.904230411317466
              ],
              [
                107.40274804742582,
                10.904230411317466
              ],
              [
                107.40274804742582,
                11.541372364133514
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            107.04706567437894,
            11.301767587272092
          ]
        }
      ],
      "coordinates": []
    });
var viz = {
  min: 1,
  max:4,
  palette: ['0000FF','FF0000','FFFF00','00FF00']
} ;
Map.addLayer(anh2015, viz, '2015',0);
Map.addLayer(anh2020, viz, '2021',0);
Map.centerObject(khuvuc,7);
Map.addLayer(khuvuc, {color: ''}, 'Huyện Vĩnh Cửu', 0);
var border = ee.Image().byte().paint({featureCollection:khuvuc, width : 2});
Map.addLayer(border,{palette:'blue'},'ranh gioi');
// ID=1 : Mặt Nước
// ID=2: Đất Trống
// ID=3 : Công trình xây dựng
// ID=4: Thực vật
//-----------------------------------------------------gioi thieu ve lop phu 2015---------------------//
var extract_matnuoc_2015 = anh2015.eq(1);
var matnuoc_2015 = anh2015.updateMask(extract_matnuoc_2015);
  Map.addLayer(matnuoc_2015, {palette:'0000FF'},'mặt nước 2015 ',0);
var extract_thucvat_2015 = anh2015.eq(4);
var thucvat_2015 = anh2015.updateMask(extract_thucvat_2015);
  Map.addLayer(thucvat_2015, {palette:'0000FF'},'Thực vật 2015 ',0);  
var extract_dattrong_2015 = anh2015.eq(2);
var dattrong_2015 = anh2015.updateMask(extract_dattrong_2015);
  Map.addLayer(dattrong_2015, {palette:'0000FF'},'dất trống 2015 ',0); 
  var extract_ctxaydung_2015 = anh2015.eq(3);
var ctxaydung_2015 = anh2015.updateMask(extract_ctxaydung_2015);
  Map.addLayer(ctxaydung_2015, {palette:'0000FF'},'công trình xây dựng 2015 ',0); 
  //-----------------------------------------------------gioi thieu ve lop phu 2021---------------------//
var extract_matnuoc_2021 = anh2020.eq(1);
var matnuoc_2021 = anh2020.updateMask(extract_matnuoc_2021);
  Map.addLayer(matnuoc_2021, {palette:'0000FF'},'mặt nước 2021 ',0);
var extract_thucvat_2021 = anh2020.eq(4);
var thucvat_2021 = anh2020.updateMask(extract_thucvat_2021);
  Map.addLayer(thucvat_2021, {palette:'0000FF'},'Thực vật 2021 ',0);  
var extract_dattrong_2021 = anh2020.eq(2);
var dattrong_2021 = anh2020.updateMask(extract_dattrong_2021);
  Map.addLayer(dattrong_2021, {palette:'0000FF'},'dất trống 2021 ',0); 
  var extract_ctxaydung_2021 = anh2020.eq(3);
var ctxaydung_2021 = anh2020.updateMask(extract_ctxaydung_2021);
  Map.addLayer(ctxaydung_2021, {palette:'0000FF'},'công trình xây dựng 2021 ',0); 
  //-----------------------------------------------------bien dong---------------------//
var biendongmatnuoc = matnuoc_2015.updateMask(dattrong_2021);
  Map.addLayer(biendongmatnuoc, {palette:'yellow'},'Mặt Nước -> Đất Trống',1); 
var biendongmatnuoc = matnuoc_2015.updateMask(ctxaydung_2021);
  Map.addLayer(biendongmatnuoc, {palette:'blueViolet'},'Mặt Nước -> Công trình xây dựng',1); 
  var biendongthucvat = thucvat_2015.updateMask(ctxaydung_2021);
  Map.addLayer(biendongthucvat, {palette:'Crimson'},'Thực vật -> công trình xây dựng',1);
    var biendongthucvat = thucvat_2015.updateMask(dattrong_2021);
  Map.addLayer(biendongthucvat, {palette:'Coral'},'Thực vật -> Đất trống',1);
    var biendongdattrong = dattrong_2015.updateMask(ctxaydung_2021);
  Map.addLayer(biendongdattrong, {palette:'FireBrick'},'Đất trống -> Công trình xây dựng',1);
   var biendongdattrong = dattrong_2015.updateMask(thucvat_2021);
  Map.addLayer(biendongdattrong, {palette:'SpringGreen'},'Đất trống -> Thực vật',1);
Map.centerObject(khuvuc,11);
// // ----------------XAY DUNG GIAO DIEN-----------------------
//ui.Panel
var panel = ui.Panel ({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width:'800px',
    border:'5px solid green'
  // backgroundColor: '90EE90'
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
var    anh2020 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021").visualize(viz); 
Map.addLayer(anh2015,{},'2015',0)   ; 
Map.addLayer(anh2020,{},'2021',false)   ; 
//-------------- chen thumbnail vao panel--------------------
var name_1 = ui.Label('Bản đồ biến động năm 2015 - 2021',{
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight:'bold',
  fontSize:'18px'
});
panel.add(name_1);
var anh2015 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2015").visualize(viz);
var    anh2020 = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021").visualize(viz); 
Map.addLayer(anh2015,{},'2015',0)   ; 
Map.addLayer(anh2020,{},'2021',0)   ; 
// tạo mảng
var list = [anh2015,anh2020,anh2015,anh2020,anh2015,anh2020,];
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
var name_2 = ui.Label('Diện tích biến động lớp phủ năm 2015 - 2021',
{
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight:'bold',
  fontSize:'18px',
backgroundColor: '006400',
color:'ffffff',
   padding:'5px 10px 5px 15px ',
    margin: '20px 5px 5px 5px'   ,
});
panel.add(name_2); 
///////////////////////////////////////////////////////////////////////////////////////////////////
//dong 1
var line1=ui.Label({
  value: '_____________________________________________________________________________________________________________________________',
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
table1.add(ui.Label({value: 'Diện tích 2015 (ha)',style: {fontWeight: 'bold',margin:'1px 0px 0px 2px'}}));
table1.add(ui.Label({value: 'Diện tích 2021 (ha)',style: {fontWeight: 'bold',margin:'1 px 0px 0px 2px',padding:'0px 0px 0px 80px'}}));
table1.add(ui.Label({value: 'Biến động (ha)',style: {fontWeight: 'bold',margin:'1 px 0px 0px 2px',padding:'0px 0px 0px 80px'}}));
panel.add(table1)
// dong 2
var line2=ui.Label({
  value: '_____________________________________________________________________________________________________________________________',
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
table2.add(ui.Label({value: '79772',style: {margin:'0px 0px 0px 2px'}}));
table2.add(ui.Label({value: '74278',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 175px'}}));
table2.add(ui.Label({value: '- 5494',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 165px'}}));
panel.add(table2)
// dong 3
var line3=ui.Label({
  value: '_____________________________________________________________________________________________________________________________',
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
table3.add(ui.Label({value: '11586',style: {margin:'0px 0px 0px 2px'}}));
table3.add(ui.Label({value: '11183',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 175px'}}));
table3.add(ui.Label({value: '- 402',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 165px'}}));
panel.add(table3)
//dong 4
var line4=ui.Label({
  value: '_____________________________________________________________________________________________________________________________',
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
table4.add(ui.Label({value: '545',style: {margin:'0px 0px 0px 2px'}}));
table4.add(ui.Label({value: '479',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 195px'}}));
table4.add(ui.Label({value: '- 66',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 185px'}}));
panel.add(table4)
//dong 5
var line5=ui.Label({
  value: '_____________________________________________________________________________________________________________________________',
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
table5.add(ui.Label({value: '17533',style: {margin:'0px 0px 0px 2px'}}));
table5.add(ui.Label({value: '23495',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 175px'}}));
table5.add(ui.Label({value: '+ 5962',style: {margin:'0px 0px 0px 2px',padding:'0px 0px 0px 165px'}}));
panel.add(table5)
var line6=ui.Label({
  value: '_____________________________________________________________________________________________________________________________',
  style: { 
    padding:'1px 20px  ',
    margin: '1px 1px'  ,
    },});
panel.add(line6)
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '20px 40px',
    color:'black',
      }
});
var table7=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table7.add(ui.Label({value: 'Qua bảng trên ta thống kê được diện tích biến động của từng loại đối tượng ',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
panel.add(table7)
var table8=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table8.add(ui.Label({value: '- Đất công trình xây dựng  tăng 5962 ha.',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
panel.add(table8)
var table9=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table9.add(ui.Label({value: '- Đất trống  giảm 66 ha.',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
panel.add(table9)
var table10=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table10.add(ui.Label({value: '- Mặt nước  giảm 402 ha.',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
panel.add(table10)
var table11=ui.Panel({style:{margin:'1px 2px 1px 10px'}, layout: ui.Panel.Layout.flow('horizontal')});
table11.add(ui.Label({value: '- Thực vật giảm 5494 ha.',style: { margin:'0px 0px 0px 2px',padding:'0px 0px 0px 40px'}}));
panel.add(table11)
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
  var palette =['FFFF00','8A2BE2' ,'DC143C' ,'F08080' ,'B22222' ,'00FF7F'];
  var names = ['Mặt Nước -> Đất Trống',
'Mặt Nước -> Công trình xây dựng',
'Thực vật -> công trình xây dựng',
'Thực vật -> Đất trống',
'Đất trống -> Công trình xây dựng',
'Đất trống -> Thực vật'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
  });
// Add the legend to the map.
Map.add(legend);
// panel.add(legend)
var title = ui.Label(' Bản đồ biến động lớp phủ huyện Vĩnh Cửu tỉnh Đồng Nai năm 2015-2021', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '15px',
  color: 'FF0000',
});
Map.add(title);