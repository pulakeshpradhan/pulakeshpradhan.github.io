var bu_char = require('users/Jyoti/MTech_Thesis_App_2020:BU_char');
var label = new ui.Label('Draw a rectangle to get High Rise Map');
Map.setOptions('SATELLITE');
var inspector = new ui.Panel([label]);
Map.add(inspector);
Map.drawingTools().setLinked(false);
Map.drawingTools().setDrawModes(['rectangle']);
Map.drawingTools().addLayer([]);
Map.drawingTools().setShape('rectangle');
Map.drawingTools().draw();
var viz={min:0,max:1,palette:['purple','blue','green','yellow','red']};
var rect;
var drawingTools = Map.drawingTools();
// drawingTools.setShown(false);
// while (drawingTools.layers().length() > 0) {
//   var layer = drawingTools.layers().get(0);
//   drawingTools.layers().remove(layer);
// }
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
var getHR = function()
{
  Map.layers().reset();
  rect = Map.drawingTools().layers().get(0).toGeometry();
  var s2_image = bu_char.leastCloudy(rect);
  s2_image = bu_char.resampleBands(s2_image);
  var index_image = bu_char.calculateIndices(s2_image);
  var sar_image = bu_char.sarFilter(rect);
  var grid_500 = bu_char.makeGrid(500,rect);
  var csi_thresh = index_image.select('CSI').gte(0);
  var vh_thresh = sar_image.select('VH').gte(-4);
  var csi_variance = csi_thresh.reduceRegions(
    {
      collection:grid_500,
      reducer:ee.Reducer.variance(),
      scale:10
    });
  var csi_mean = csi_thresh.reduceRegions(
    {
      collection:csi_variance,
      reducer:ee.Reducer.mean(),
      scale:10
    });
  var mvr = csi_mean.map(bu_char.getMVR);
  var vh_sum = vh_thresh.reduceRegions(
    {
      collection:mvr,
      reducer:ee.Reducer.sum(),
      scale:10
    });
  var product_feat = vh_sum.map(bu_char.getProduct);
  var getNormalizedPro = function (feat)  
  {
    var product = ee.Number(feat.get('product'));
    var max = ee.Number(product_feat.aggregate_max('product'));
    var n = product.divide(max);
    return feat.set({'HR_flag':n});
  };
  var final = product_feat.map(getNormalizedPro);
  var hr_img = final.reduceToImage(['HR_flag'],ee.Reducer.first());
  Map.addLayer(rect,{},'Selected Rectangle')
  Map.addLayer(hr_img,viz,'HR_img');
  Map.drawingTools().layers().reset();
  Map.drawingTools().setDrawModes(['rectangle']);
  Map.drawingTools().setShape('rectangle');
  Map.drawingTools().draw();
};
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
    }
  });
var legendTitle = ui.Label({
  value: 'High Rise Flag Indicator',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
  legend.add(legendTitle); 
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel);
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
  });
legend.add(thumbnail);
panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
legend.add(panel);
Map.add(legend);
Map.drawingTools().onEdit(ui.util.debounce(getHR,500));
Map.drawingTools().onDraw(ui.util.debounce(getHR,500));
Map.drawingTools().onErase(getHR);