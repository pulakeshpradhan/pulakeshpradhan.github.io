var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//constants
var cloud_probability_thresh=30;
var visParams={bands:['B4','B3','B2'],min:0,max:0.2};
var cloud_buffer_distance=300;
var pumice_thresh_min=-0.05
var pumice_thresh_max=0.2
var ROI=ee.Geometry.Rectangle([126.9,25.9,128.9,26.9])
var start='2021-10-26';
var end='2021-10-27';
Map.setCenter(127.9,26.72,12)
//function that creates a cloud masked composite image in a given period of time
var create_composite=function(start,end,ROI,pumice_thresh_min,pumice_thresh_max,cloud_buffer_distance){
  var mask = ee.ImageCollection("ESA/WorldCover/v100")
  .map(function(image){
    return image.eq(80).not().unmask(0);
  }).max();
  var empty=ee.Image().unmask(0);
  var water=empty.blend(mask).not().eq(1);
  var S2L2A=ee.ImageCollection("COPERNICUS/S2_SR")
  .filterDate(start,end)
  .filterBounds(ROI)
  .map(function(image){
    return image.clip(ROI).divide(10000);
  });
  //The sentinel-2 cloud probability images
  var S2_cloud_probability=ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
  .filterDate(start,end)
  .filterBounds(ROI)
  .map(function(image){
    return image.clip(ROI);
  });
  //Merge the sentinel-2 image collection and the sentinel-2 cloud probability image collection
  var filter = ee.Filter.equals({
    leftField: 'system:index',
    rightField: 'system:index'
  });
  var simpleJoin = ee.Join.inner();
  var innerJoin = ee.ImageCollection(simpleJoin.apply(S2L2A,S2_cloud_probability , filter));
  var S2L2A_with_CloudProbability = innerJoin.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
  //A function that masks the cloud contaminated pixels 
  var add_cloud_mask=function(image){
    var cld_prb = image.select('probability');
    var cloud_mask = cld_prb.lt(cloud_probability_thresh);
    var clouds_buffer=ee.Image(1)
    .cumulativeCost({
      source:cld_prb.gt(cloud_probability_thresh),
      maxDistance:cloud_buffer_distance
    }).gt(cloud_buffer_distance).unmask(1);
    return image.updateMask(clouds_buffer);
  };
  //A function that masks the water pixels
  var update_water_mask=function(image){
    return image.updateMask(water);
  };
  //Apply the functions on the whole dataset
  var S2L2A_with_CloudMask=S2L2A_with_CloudProbability
  .map(add_cloud_mask)
  .map(update_water_mask)
  //Define a vegetation index
  var add_Index=function(image){
    var Index = ee.Image(0).expression(
    //This formula can be changed to an arbitrary form such as (Band8-Band4)/(Band8+Band4)
    '(B8+B7-2*B2)/(B8+B7+2*B2)', {
      'B8': image.select('B8'),
      'B7': image.select('B7'),
      'B2': image.select('B2'),
    });
  return image.addBands(Index.rename('Pumice Index'));
  }
  //Add a VI layer
  //var S2L2A_with_CloudMask_with_Index=add_Index(S2L2A_with_CloudMask);
  var S2L2A_with_CloudMask_with_Index=S2L2A_with_CloudMask
  .map(add_Index);
  return S2L2A_with_CloudMask_with_Index;
};
var cloud_shadow_mask=function(image){
    var Index = ee.Image(0).expression(
    '(B8+B4+B3+B2)/4', {
      'B8': image.select('B8'),
      'B4': image.select('B4'),
      'B3':image.select('B3'),
      'B2': image.select('B2'),
    });
    var cloud_shadow=Index.gt(0.05)
  return image.updateMask(cloud_shadow);
  }
var cloud_shadow_mask2=function(image){
    var Index = ee.Image(0).expression(
    'B11-B4', {
      'B11': image.select('B11'),
      'B4': image.select('B4'),
    });
    var cloud_shadow=Index.lt(0.0)
  return image.updateMask(cloud_shadow);
  }
var composite=create_composite(start,end,ROI,pumice_thresh_min,pumice_thresh_max,cloud_buffer_distance);
var Pumice_image=composite
.map(cloud_shadow_mask)
.map(cloud_shadow_mask2)
.select('Pumice Index').max()
Map.addLayer(composite.select(['B2','B3','B4','B5','B6','B7','B8','B9','B11','B12']),{bands:['B4','B3','B2'],min:0,max:0.2},start+' to '+end+' composite');
Map.addLayer(Pumice_image.updateMask(Pumice_image.gt(pumice_thresh_min)).updateMask(Pumice_image.lt(pumice_thresh_max)),{min:-1,max:1,palette: ['blue', 'red', 'blue']},start+' to '+end+' Pumice index');
//////
//Settings for the interactive earth engine app
var mainPanel = ui.Panel({
  style: {width: '600px'}
});
var title = ui.Label({
  value: 'Pumice detection with Sentinel-2',
  style: {'fontSize': '24px'}
});
mainPanel.add(title)
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
});
mainPanel.add(dropdownPanel);
var startSelector = ui.Textbox({
  value:'2021-10-26'
  })
var endSelector = ui.Textbox({
  value:'2021-10-27'
  })
var PumiceLowerThreshSelector=ui.Textbox({
  value:'-0.05'
})
var PumiceUpperThreshSelector=ui.Textbox({
  value:'0.2'
})
var cloudBuffer=ui.Textbox({
  value:'300'
})
//drawing tools
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
///////////////////
//Style settings
var button = ui.Button('Load')
dropdownPanel.add(ui.Label('Sentinel-2衛星の画像を使った軽石の検索・検出の為のパラメータを設定することができます。検出パラメータはデフォルト値でも動作します。マウスのホイールで拡大縮小、ドラッグでマップ上を移動できます。'))
dropdownPanel.add(ui.Label('衛星画像検索の開始日を入力してください'))
dropdownPanel.add(startSelector)
dropdownPanel.add(ui.Label('衛星画像検索の終了日を入力してください。'))
dropdownPanel.add(endSelector)
dropdownPanel.add(ui.Label('下のボタンを押してから、マウスで左クリックしながらドラッグすることで画面上に軽石分布を調べたい領域を描いてください。'))
dropdownPanel.add(ui.Button({label:'Draw the region of interest',onClick: drawRectangle}))
dropdownPanel.add(ui.Label('軽石検出の閾値の下限を入力してください。'))
dropdownPanel.add(PumiceLowerThreshSelector)
dropdownPanel.add(ui.Label('軽石検出の閾値の上限を入力してください。'))
dropdownPanel.add(PumiceUpperThreshSelector)
dropdownPanel.add(ui.Label('雲マスクのバッファー半径を選んでください（単位：メートル）'))
dropdownPanel.add(cloudBuffer)
dropdownPanel.add(ui.Label('入力が終了したら、Loadボタンを押してください。'))
dropdownPanel.add(button)
// Define a function that triggers when any value is changed
var loadComposite = function() {
  Map.clear()
  var ROI = drawingTools.layers().get(0).getEeObject();
  drawingTools.setShape(null);
  var col = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .filterBounds(ROI)
  .map(function(image){
    return image.clip(ROI)
  });
  var start = startSelector.getValue()
  var end = endSelector.getValue()
  var pumice_thresh_min=ee.Number.parse(PumiceLowerThreshSelector.getValue())
  var pumice_thresh_max=ee.Number.parse(PumiceUpperThreshSelector.getValue())
  var cloud_buffer_distance=ee.Number.parse(cloudBuffer.getValue())
  Map.centerObject(ROI,11)
  var composite=create_composite(start,end,ROI,pumice_thresh_min,pumice_thresh_max,cloud_buffer_distance);
  var Pumice_image=composite
  .map(cloud_shadow_mask)
  .map(cloud_shadow_mask2)
  .select('Pumice Index').max();
  Map.addLayer(composite,{bands:['B4','B3','B2'],min:0,max:0.2},start+' to '+end+' composite');
  Map.addLayer(Pumice_image.updateMask(Pumice_image.gt(pumice_thresh_min)).updateMask(Pumice_image.lt(pumice_thresh_max)),{min:-1,max:1,palette: ['blue', 'red', 'blue']},start+' to '+end+' Pumice index');
  clearGeometry()
}
button.onClick(loadComposite)
ui.root.add(mainPanel);
/////