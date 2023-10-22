// Load chongqing geometry
var cq = ee.FeatureCollection('users/shawfi/ChongQing').geometry();
Map.centerObject(cq, 7);
// Set time series start time and end time 
var sTime = '2014-03-20';
var eTime = '2019-03-20';
// Visualize NDVI data
var ndviVIS = {
  min: 0.0,
  max: 9000,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
// var modis = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(sTime, eTime)
var rawCol = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(sTime, eTime).map(function(item) {
  return item.unmask(ee.Image(0)).clip(cq);
})
var timeLine = rawCol.getRegion(cq.centroid(), 250).slice(1).map(function(item) {return ee.List(item).get(0)});
// print(timeLine);
var modis = ee.ImageCollection("users/shawfi/TEST/krige").filterDate(sTime, eTime)
.map(function(item) { 
  var date = item.date();
  var image = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate(date, date.advance(1, 'day')).first();
  image = image.clip(cq);
  var imageQA = image.select("DetailedQA");
  var ndvi = item.select("NDVI");
  var qa = imageQA.bitwiseAnd(ee.Image(3)).updateMask(ndvi).unmask(ee.Image(3)).rename("QA");
  item = item.addBands(qa);
  var NDVI = ndvi.unmask(ee.Image(0)).rename("NDVI");
  return item.select("QA").addBands(NDVI);
}).sort("system:time_start");
// print(modis);
var sgLong = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate('2012-01-01', '2020-01-01').select('NDVI').map(function(item) {
  return item.unmask(ee.Image(0)).clip(cq);
})
// print(sgLong.first());
var wsgLong = ee.ImageCollection("users/shawfi/TEST/krige").sort("system:time_start").filterDate('2012-01-01', '2020-01-01').select('NDVI');
// ************************************************************************************
// Smooth filter
var smooth = function(m, d, col){
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
    // var imgColLong = ee.ImageCollection("MODIS/006/MOD13Q1").filterDate('2012-01-01', '2020-01-01').select('NDVI').map(function(item) {
    //   return item.unmask(ee.Image(0)).clip(cq);
    // })
    var imgColLong = col;
    var days = ee.Number(image.date().difference('2000-01-01', 'day')).int16();
    var baseDate = ee.Date('2000-01-01');
    var startDate = baseDate.advance(days.subtract( m * 16), 'day');
    // var startDate = baseDate.advance(-16, 'day')
    var len = windowSize;
    for(var i = 0 ; i < len; i++) {
      if( i === 0 ){
        var smooth = imgColLong.filterDate(startDate.advance( 16 * i , 'day'), startDate.advance( 16 * ( i + len), 'day')).first().multiply(ee.Image(hList.get(i)))
      } else {
        smooth = smooth.add(imgColLong.filterDate(startDate.advance( 16 * i , 'day'), startDate.advance( 16 * ( i + len), 'day')).first().multiply(ee.Image(hList.get(i))));
      }
    }
    smooth = smooth.rename('SG').toInt16();
    return image.addBands(smooth).select("SG").rename("NDVI");
  }
}
var sgCol = rawCol;
var resFunc = function(item) {
  var start = item.date()
  var ndvi = modis.filterDate(start, start.advance(1, "day")).select("NDVI").first().clip(cq);
  var qa = modis.filterDate(start, start.advance(1, "day")).select("QA").first().clip(cq);
  var sg = item.select("NDVI");
  var img0 = ndvi.updateMask(qa.eq(0));
  var sg0 = sg.updateMask(qa.eq(0));
  var res0 = img0;
  var img1 = ndvi.updateMask(qa.eq(1));
  var sg1 = sg.updateMask(qa.eq(1));
  var res1 = img1.multiply(0.4).add(sg1.multiply(0.6));
  var img2 = ndvi.updateMask(qa.eq(2));
  var sg2 = sg.updateMask(qa.eq(2));
  var res2 = img2.multiply(0.3).add(sg2.multiply(0.7));
  var img3 = ndvi.updateMask(qa.eq(3));
  var sg3 = sg.updateMask(qa.eq(3));
  var res3 = sg3;
  var res = img0.unmask(res1).unmask(res2).unmask(res3).rename("SG");
  return item.addBands(res).select("SG").rename("NDVI");
}
var Person = require("users/shawfi/lab:Modules/Person.js");
var CS = require("users/shawfi/lab:Modules/CurveSmoothness.js");
var points = ee.FeatureCollection.randomPoints(cq, 50, 1000).map(function(item) {
  var id = ee.Number(item.id());
  return item.set({"id": id});
})
var m = 2;
var d = 2;
var i = 0;
var getList = function(item) {
  return ee.List(item).get(-1);
}
var wsgCol = modis.map(smooth(5, 3, wsgLong)).select("NDVI").map(resFunc);
// // print(wsgCol)
// Map.addLayer(rawCol.first(), {}, "wsg 1");
// Map.centerObject(wsgCol, 8);
var ndviCol = rawCol.select("NDVI");
// // ************************************************************************************
// // Processing images
// var imgColSG = imgCol.map(smooth(5, 3)).map(function(image) {return image.clip(cq)});
// var imgColNDVI = imgColSG.select('NDVI', 'smoothed');
// var imgDate = imgColNDVI.filterDate('2018-08-14', '2018-08-30');
// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 10000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
// ************************************************************************************
// Visual analysis, display the original image and the smoothed results in split screen
// **********************************************************************************
// Layout vis
// DateSlider callback function
// Show SplitPanel
var showImage = function(range){
  // print(range);
  var start = range.start();
  var end = range.end();
  // var img = imgColNDVI.filterDate(start, end);
  var leftImg = ndviCol.filterDate(start, end);
  var rightImg = wsgCol.filterDate(start, end);
  showMap(leftImg, rightImg);
}
// *************************************************************************************
// Page layout : the DateSlider is on the left and a split screen for comparison is on the right
// DateSlider 
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
// A panel to contain DateSlier
// and the panel also can have many other widgets
var main_panel = ui.Panel({
    widgets: dateSlider,
    style: {
      width: "280px",
      padding: "4px"
    }
  });
// Construct a split panel
var leftMap = ui.Map();
var rightMap = ui.Map();
// Hide all control buttons
leftMap.setControlVisibility(true); 
rightMap.setControlVisibility(true);
var linker = new ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    orientation: 'horizontal', 
    // false: the two split map are same
    // true: the two split map are connected
    wipe: false 
  });
// Map layout
ui.root.clear();
ui.root.insert(0, main_panel);
ui.root.add(splitPanel);
// Visualize NDVI data
var ndviVis = {
    min: 0.0,
    max: 10000.0,
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
  var rightName = 'WSG NDVI';
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