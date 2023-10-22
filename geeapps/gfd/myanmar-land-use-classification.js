var trainingPoint = ui.import && ui.import("trainingPoint", "table", {
      "id": "users/gfd/Myanmar/Pyapon_March2018"
    }) || ee.FeatureCollection("users/gfd/Myanmar/Pyapon_March2018"),
    bound_vn = ui.import && ui.import("bound_vn", "table", {
      "id": "users/gfd/Myanmar/RG_Pyapon"
    }) || ee.FeatureCollection("users/gfd/Myanmar/RG_Pyapon");
//*** GET SENTINEL-2 IMAGEs. ****/
//Kho sưu tập ảnh Sentinel 2
var S2 = ee.ImageCollection("COPERNICUS/S2") 
//Add ranh giới Quảng nam vào phần hiển thị bản đồ
Map.addLayer(bound_vn,{},'Pyanpon boundary',false)
//Thông số để hiển thị màu, kênh ảnh Sentinel 2
var vizParams = {'bands': 'B4,B3,B2','min': 0,'max': 2000};
// Lọc ảnh theo ngày, ranh giới, độ phủ mây
var images = S2.filterDate('2018-03-03', '2018-03-05')
                .filterBounds(bound_vn)
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",30);
//Ghép các cảnh ảnh filter được ở trên
var images = images.mosaic().clip(bound_vn)
var images = images.toUint16()
//Classification image
var PALETTE = ['#fcf00a', // 1_Agriculture land
               '#09d3fc', // 2_Aquaculture pond (without mangrove)
               '#a0a9aa', // 3_Bared land
               '#bfe09a',//4_Grass & shrubs in open areas
               '#1595e0', //5_Mangrove (in pond)
               '#fec44f',//6_Mangrove plantation
               '#31a354',//7_Natural mangrove (open)
               '#868c55',//8_Shrubs with few mangrove regenerating trees
               '#bdbdbd' //9_Others
                ];
var bands = ['B8','B4','B3','B2'];
var training = images.sampleRegions({collection: trainingPoint, properties: ['lucode'], scale: 30 });
// set classifier
var classifier = ee.Classifier.randomForest(100)
                 .train({features:training, classProperty:'lucode', inputProperties: bands});
// classify
var classified = images.select(bands).classify(classifier); 
//Add ảnh tìm được vào cửa sổ bản đồ
Map.addLayer(images,vizParams, 'SENTINEL 2 IMAGE');
Map.addLayer(classified,{min:1,max:9,palette:PALETTE},'Classify',true)
Map.addLayer(trainingPoint,{color:'Black'},"Training point")
// Xuất ảnh ra google driver
Export.image.toDrive({
  image: images,
  description: 'MYANMAR_2018-03-04',
  folder: 'SENTINEL_VN', //Ten folder trong Google driver cua ban
  region: bound_vn,
  // crs: 'EPSG:32648',
  scale:10, //Độ phân giải 10m
  maxPixels:1e9 //Max pixel để đỡ bị giới hạn số pixel download
  })
//Đặt mức zoom cho ranh giới hiển thị đến vùng Quảng Nam
Map.centerObject(bound_vn,12)
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Classification',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['fcf00a','09d3fc','a0a9aa','bfe09a','1595e0','fec44f','31a354','868c55','bdbdbd'];
// name of the legend
var names = ['Agriculture land','Aquaculture pond (without mangrove)','Bared land','Grass & shrubs in open areas','Mangrove (in pond)','Mangrove plantation','Natural mangrove (open)','Shrubs with few mangrove regenerating trees','Others'];
// Add color and and names
for (var i = 0; i <9 ; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);