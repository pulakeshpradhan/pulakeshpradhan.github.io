var rect = ee.Geometry.Rectangle({
  coords: [[73, 31], [99, 48]],
  geodesic: false
});
Map.addLayer(rect);
Map.centerObject(rect, 3);
// 选择影像集
var collection = ee.ImageCollection("MODIS/006/MOD13Q1")
  .filterDate('2000-01-01', '2019-01-01')
  .select('NDVI');
print(collection);
//
var col=ee.List([]);
for(var i=2000;i<2019;i++){
  var img=collection.filterDate(i+'-01-01',i+'-12-31');
  var img_max=img.select("NDVI").max();
  col=col.add(img_max);
}
col=ee.ImageCollection(col);
print(col,"col");
// 作为预览，加载第一幅影像
var im = ee.Image(col.first());
Map.addLayer(im, {}, "first image");
// 可视化参数
var args = {
  crs: 'EPSG:3857',  // Maps Mercator
  dimensions: '300',
  region: rect,
  min: -2000,
  max: 10000,
  palette: 'black, blanchedalmond, green, green',
  framesPerSecond: 12,
};
// 制作动图，并且加载到地图上
var thumb = ui.Thumbnail({
//为“image”指定一个集合会使图像序列产生动画效果
  image: col,
  params: args,
  style: {
    position: 'bottom-right',
    width: '320px'
  }});
Map.add(thumb);
print(col.getVideoThumbURL(args));