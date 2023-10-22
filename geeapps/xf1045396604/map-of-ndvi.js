var liyang = ee.FeatureCollection("users/xf1045396604/liyang"),
    image = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[115.76516421621608, 31.278672141565654],
          [118.34695132559108, 31.015400601600707],
          [117.80569935623595, 33.24848334425934],
          [115.33377552811095, 33.01848500845854]]]);
var center = {lon: 119, lat: 31, zoom: 9};
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
leftMap.setControlVisibility(false); //控制按钮全部隐藏
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl:false});
rightMap.setControlVisibility({zoomControl: true});//放大缩小按钮显示
var linker = new ui.Map.Linker([leftMap, rightMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal', //水平布局
  wipe: false //采用平滑的擦拭效果
});
ui.root.clear();
ui.root.add(splitPanel);
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2017-01-01', '2018-01-01')
                  .median();
landsat = landsat.addBands(landsat.normalizedDifference(['B5', 'B4']).rename("NDVI"));
var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
leftMap.addLayer(landsat, vis, "rgb");
var visNDVI = {
  min: 0,
  max: 1,
  palette: 'FFFFFF,CE7E45,DF923D,F1B555,FCD163,99B718,74A901,66A000,529400,' +
      '3E8601,207401,056201,004C00,023B01,012E01,011D01,011301'
};
rightMap.addLayer(landsat.select("NDVI"), visNDVI, 'NDVI');