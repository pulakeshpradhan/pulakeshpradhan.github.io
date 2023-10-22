var sentinel = ui.import && ui.import("sentinel", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR");
var maskS2cloud = function(image){
  var qa = image.select('QA60'),
      cloudBitMask = 1<<10,
      cirrusBitMask = 1<<11,
      mask = qa.bitwiseAnd(cloudBitMask).eq(0)
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, image.propertyNames());
};
var panel = ui.Panel({
  style:{
    width:'300px'
  }
})
ui.root.add(panel)
var slider = ui.DateSlider({
  start:'2018-01-01',
  end:'2021-02-06',
  value:'2020-09-01',
  period:10,
  style:{
    position:'top-left',
    width:'250px',
    padding:'0px',
    margin:'100px 0px 0px 20px'
  },
  onChange:function(range){
    var bound = ee.Geometry.Rectangle(Map.getBounds()),
        start_date = range.start(),
        end_date = range.end(),
        image = ee.Image(sentinel.filterDate(start_date,end_date).filterBounds(bound).map(maskS2cloud).median()),
        layer = ui.Map.Layer(image,{min:0,max:0.3,band:['B4','B3','B2']});
    Map.layers().set(0,layer)
  }
})
panel.add(slider)