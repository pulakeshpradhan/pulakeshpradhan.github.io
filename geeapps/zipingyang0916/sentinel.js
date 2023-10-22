var sentinel = ui.import && ui.import("sentinel", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR");
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
  period:5,
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
        image = ee.Image(sentinel.filterDate(start_date,end_date).filterBounds(bound).median()),
        layer = ui.Map.Layer(image,{min:0,max:3000,band:['B4','B3','B2']});
    Map.layers().set(0,layer)
  }
})
panel.add(slider)