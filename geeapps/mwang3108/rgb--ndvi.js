var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                116.30630486676667,
                40.000042978700435
              ],
              [
                116.30630486676667,
                39.84100606772981
              ],
              [
                116.52328484723542,
                39.84100606772981
              ],
              [
                116.52328484723542,
                40.000042978700435
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[116.30630486676667, 40.000042978700435],
          [116.30630486676667, 39.84100606772981],
          [116.52328484723542, 39.84100606772981],
          [116.52328484723542, 40.000042978700435]]], null, false);
//定义初始化定义初始化地图定义初始化地图地图
var center = /* color: #d63000 */ee.Geometry.Point([116.387928, 40.00649])
var zoom = 9
//初始化
var leftMap = ui.Map()
leftMap.centerObject(center,zoom)
var rightMap = ui.Map()
rightMap.centerObject(center,zoom)
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl:true});
var linker = new ui.Map.Linker([leftMap,rightMap])
//定义滑动定义滑动界面组件定义滑动界面组件界面
var splitPanel = ui.SplitPanel({
  firstPanel:leftMap,
  secondPanel:rightMap,
  orientation:'horizontal',
  wipe:true
})
  ui.root.clear();
  ui.root.add(splitPanel)
//左地图显示RGB
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
       .filterDate("2017-01-01","2018-01-01")
       .median()
    landsat = landsat.addBands(landsat.normalizedDifference(['B5',"B4"]).rename("NDVI"))
    var vis = {bands:['B4','B3','B2'],min:0,max:3000}
    leftMap.addLayer(landsat,vis,"rgb")
//右地图显示NDVI
var visNDVI = {
  min:0,
  max:1,
  palette:'FFFFFF,CE7E45,DF923D,F1B555,FCD163,99B718,74A901,66A000,529400,' + 
     '3E8601,207401,056201,004C00,023B01,012E01,011D01,011301' 
}
rightMap.addLayer(landsat.select("NDVI"), visNDVI, 'NDVI')