// Load chongqing geometry
var cq = ee.FeatureCollection('users/shawfi/ChongQing').geometry();
// Set time series start time and end time 
// var sTime = ee.Date("2014-3-20");
// var eTime = ee.Date("2019-3-20");
var sTime = '2014-03-20';
var eTime = '2019-03-20';
// Change the scale of NDVI to 0.0001
var imgCol = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(sTime, eTime)
.map(function(image) { return image.clip(cq); });
var addNDVI = function(image) {
  return image.addBands(image.select('NDVI').divide(1e4).float().rename('ndvi')).select('ndvi').rename('NDVI')
};
imgCol = imgCol.map(addNDVI);
// ************************************************************************************
// Smooth filter
var smooth = function(m, d){
  return function(image) {
    // M is the size of half a window
    // and N is the number of terms in the polynomial
    var M = m;
    var windowSize = M * 2 + 1;
    var N = d;
    // Find the coefficients corresponding to the polynomial
    var order_range = ee.List.sequence(0,N);
    var k_range = ee.List.sequence(-M, M);
    var A = ee.Array(k_range.map(function (k) { 
      return order_range.map(function(o) { 
        return ee.Number(k).pow(o)})}));
    var At = A.matrixTranspose();
    var B = At.matrixMultiply(A);
    var H = B.matrixInverse().matrixMultiply(At);
    var h11 = H.slice({axis: 0, start: 0, end: 1}).project([1]);
    // Convert coefficients to ee.Image format
    for(var i = 0; i< windowSize; i++){
      if( i === 0 ){
        var hList = ee.List([ee.Image(h11.get([i])).rename('NDVI')]);
      }
      else {
        hList = hList.add(ee.Image(h11.get([i])).rename('NDVI'));
      }
    }
    // ******************************
    // Import time series for smoothing
    var imgColLong = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate('2000-01-01', '2020-01-01').select('NDVI');
    // var days = ee.Image(image).date().difference('2000-01-01', 'day');
    var days = image.date().difference('2000-01-01', 'day');
    var baseDate = ee.Date('2000-01-01');
    var startDate = baseDate.advance(days.subtract( 2 * 16), 'day');
    // // Calculate the smoothed value
    var len = windowSize;
    for(var i = 0 ; i < len; i++) {
      if( i === 0 ){
        var smooth = imgColLong.filterDate(startDate.advance( 16 * i , 'day'), startDate.advance( 16 * ( i + len), 'day')).first()
        .multiply(ee.Image(hList.get(i)))
      } else {
        smooth = smooth.add(imgColLong.filterDate(startDate.advance( 16 * i , 'day'), startDate.advance( 16 * ( i + len), 'day')).first().multiply(ee.Image(hList.get(i))));
      }
    }
    smooth = smooth.divide(1e4).float().rename('smoothed');
    // return smooth;
    // var smooth = ee.Image(1);
    return image.addBands(smooth);
  }
}
// ************************************************************************************
// Processing images
var imgColSG = imgCol.map(smooth(7, 5)).map(function(image) {return image.clip(cq)});
var imgColNDVI = imgColSG.select('NDVI', 'smoothed');
// ************************************************************************************
// Visual analysis, display the original image and the smoothed results in split screen
// var showMap = function(leftImage, rightImage) {
//   var leftMap = ui.Map();
//   var rightMap = ui.Map();
//   leftMap.setControlVisibility(true); //控制按钮全部隐藏
//   rightMap.setControlVisibility(true);
//   leftMap.setControlVisibility({zoomControl: false}); //放大缩小按钮显示
//   var linker = new ui.Map.Linker([leftMap, rightMap]);
//   var splitPanel = ui.SplitPanel({
//     firstPanel: leftMap,
//     secondPanel: rightMap,
//     orientation: 'horizontal', //水平布局
//     wipe: false //采用平滑的擦拭效果
//   });
//   ui.root.clear();
//   ui.root.add(splitPanel);
//   var ndviVis = {
//     min: 0.0,
//     max: 1.0,
//     palette: [
//       'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//       '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//       '012E01', '011D01', '011301'
//     ],
//   };
//   // var date = ee.Date(leftImage.date()).format("yyyy-mm-dd").getInfo();
//   var date = leftImage.first().date().format("yyyy_MM_dd").getInfo();
//   var leftName = date + ' ndvi';
//   var leftLegend = ui.Panel({ style:{padding: '4px 10px 4px 4px'} });
//   var leftLabel = ui.Label({
//         value: leftName,
//         style: {
//             fontWeight: 'bold', fontSize: '14px',
//             margin: '0 0 2px 0', padding: '0'
//         }
//   });
//   leftLegend.add(leftLabel);
//   leftMap.add(leftLegend);
//   leftMap.addLayer(leftImage, ndviVis, leftName);
//   leftMap.centerObject(leftImage, 7);
//   var rightName = date + ' smoothed';
//   var rightLegend = ui.Panel({ style:{padding: '4px 10px 4px 4px'} });
//   var rightLabel = ui.Label({
//         value: rightName,
//         style: {
//             fontWeight: 'bold', fontSize: '14px',
//             margin: '0 0 2px 0', padding: '0'
//         }
//   });
//   rightLegend.add(rightLabel);
//   rightMap.add(rightLegend);
//   rightMap.centerObject(rightImage, 7);
//   rightMap.addLayer(rightImage, ndviVis, rightName);
// }
// **********************************************************************************
// Layout vis
// **************************
// var testLabel = ui.Label({
//         value: 'test',
//         style: {
//             fontWeight: 'bold', fontSize: '14px',
//             margin: '0 0 2px 0', padding: '0'
//         }
//   });
var showImage = function(range){
  // print(range);
  var start = range.start();
  var end = range.end();
  var img = imgColNDVI.filterDate(start, end);
  var leftImg = img.select('NDVI');
  var rightImg = img.select('smoothed');
  print(img);
  print(range);
  showMap(leftImg, rightImg);
}
var dateSlider = ui.DateSlider({
  start: sTime,
  end: eTime,
  value: null,
  period: 16,
  onChange: showImage,
  style: {
    width: "200px"
  }
});
var main_panel = ui.Panel({
    widgets: dateSlider,
    style: {
      width: "280px",
      padding: "4px"
    }
  });
// ui.root.insert(0, main_panel);
var leftMap = ui.Map();
var rightMap = ui.Map();
// 控制按钮全部隐藏
leftMap.setControlVisibility(true); 
rightMap.setControlVisibility(true);
var linker = new ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    orientation: 'horizontal', //水平布局
    wipe: false //采用平滑的擦拭效果
  });
ui.root.clear();
ui.root.insert(0, main_panel);
ui.root.add(splitPanel);
var ndviVis = {
    min: 0.0,
    max: 1.0,
    palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
      '012E01', '011D01', '011301'
    ],
  };
leftMap.centerObject(cq, 8);
var showMap = function(leftImage, rightImage) {
  // var date = leftImage.first().date().format("yyyy_MM_dd").getInfo();
  var leftName = 'RAW  NDVI';
  var leftLegend = ui.Panel({ style:{padding: '4px 10px 4px 4px'} });
  var leftLabel = ui.Label({
        value: leftName,
        style: {
            fontWeight: 'bold', fontSize: '14px',
            margin: '0 0 2px 0', padding: '0'
        }
  });
  leftLegend.add(leftLabel);
  leftMap.clear();
  leftMap.add(leftLegend);
  leftMap.addLayer(leftImage, ndviVis, leftName);
  leftMap.centerObject(leftImage, 7);
  var rightName = 'Smoothed NDVI';
  var rightLegend = ui.Panel({ style:{padding: '4px 10px 4px 4px'} });
  var rightLabel = ui.Label({
        value: rightName,
        style: {
            fontWeight: 'bold', fontSize: '14px',
            margin: '0 0 2px 0', padding: '0'
        }
  });
  rightLegend.add(rightLabel);
  rightMap.clear();
  rightMap.add(rightLegend);
  rightMap.centerObject(rightImage, 7);
  rightMap.addLayer(rightImage, ndviVis, rightName);
}
// Pick up images for display
var img0422 = imgColNDVI.filterDate('2016-04-22', '2016-04-23');
var img1015 = imgColNDVI.filterDate('2016-10-15', '2016-10-16');
var img0118 = imgColNDVI.filterDate('2018-01-18', '2018-01-19');
// Show images
// showMap(img0422.select('NDVI'), img0422.select('smoothed'));
// showMap(img1015.select('NDVI'), img1015.select('smoothed'));
// showMap(img0118.select('NDVI'), img0118.select('smoothed'));
// // Display date silder
// var start = "2014-1-1";
// var end = "2019-3-22";
// var showImage = function(range) {
//   print("show image", range);
//   // showMap(img0422.select('NDVI'), img0422.select('smoothed'));
// };
// var dateSlider = ui.DateSlider({
//   start: start,
//   end: end,
//   value: null,
//   period: 16,
//   onChange: showImage,
//   style: {
//     width: "200px"
//   }
// });
// Map.add(dateSlider);
// ************************************
// // 
// var leftMap = ui.Map();
// var rightMap = ui.Map();
// leftMap.setControlVisibility(true); //控制按钮全部隐藏
// rightMap.setControlVisibility(true);
// leftMap.setControlVisibility({zoomControl: true}); //放大缩小按钮显示
// var linker = new ui.Map.Linker([leftMap, rightMap]);
// var splitPanel = ui.SplitPanel({
//   firstPanel: leftMap,
//   secondPanel: rightMap,
//   orientation: 'horizontal', //水平布局
//   wipe: false //采用平滑的擦拭效果
// });
// ui.root.clear();
// ui.root.add(splitPanel);
// Map.centerObject(cq, 7);
// var ndviVis = {
//     min: 0.0,
//     max: 1.0,
//     palette: [
//       'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
//       '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
//       '012E01', '011D01', '011301'
//     ],
//   };
// ************************************
// var showImage = function(range) {
//   var s = range.start();
//   var e = range.end();
//   var img = imgColNDVI.filterDate(s, e);
//   leftMap.clear();
//   rightMap.clear();
//   leftMap.addLayer(img.select('NDVI'), ndviVis, 'Left Image');
//   leftMap.centerObject(img, 7);
//   rightMap.addLayer(img.select('smoothed'), ndviVis, 'Right Image');
// };
// var dateSlider = ui.DateSlider({
//     start: sTime,
//     end: eTime,
//     value: null,
//     period: 1,
//     onChange: showImage,
//     style: {
//       width: "200px"
//     }
//   });
// leftMap.add(dateSlider);