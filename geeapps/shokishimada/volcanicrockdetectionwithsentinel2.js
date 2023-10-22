var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                126.57226576340884,
                27.173245900744178
              ],
              [
                126.57226576340884,
                25.905385408348046
              ],
              [
                128.90136732590884,
                25.905385408348046
              ],
              [
                128.90136732590884,
                27.173245900744178
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[126.57226576340884, 27.173245900744178],
          [126.57226576340884, 25.905385408348046],
          [128.90136732590884, 25.905385408348046],
          [128.90136732590884, 27.173245900744178]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/shokishimada/C09-06_FishingPort"
    }) || ee.FeatureCollection("users/shokishimada/C09-06_FishingPort");
//buffer distance around clouds to avoid false alarms
var cloud_buffer_distance=50
var table=ee.FeatureCollection('users/shokishimada/C09-06_FishingPort')
.filterBounds(geometry)
var S2L2A=ee.ImageCollection("COPERNICUS/S2_SR")
.filterDate('2021-10-25','2021-10-27')
.map(function(image){
  return image.clip(geometry).divide(10000)
})
var cloud_Prob=ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
.filterDate('2021-10-25','2021-10-27')
.map(function(image){
  return image.clip(geometry)
}).max()
var S2L2A_prev=ee.ImageCollection("COPERNICUS/S2_SR")
.filterDate('2020-10-25','2020-10-27')
.map(function(image){
  return image.clip(geometry).divide(10000)
})
var cloud_Prob_prev=ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
.filterDate('2020-10-25','2020-10-27')
.map(function(image){
  return image.clip(geometry)
}).max()
var LULC=ee.ImageCollection("ESA/WorldCover/v100")
var mask=LULC.map(function(image){
  return image.eq(80).not().unmask(0)
}).max()
var empty=ee.Image().unmask(0)
var mask=empty.blend(mask).not().eq(1)
var add_Index=function(image){
  var Index=ee.Image(0).expression(
    '(B8+B4-2*B2)/(B8+B4+2*B2)',{
      'B4':image.select('B4'),
      'B2':image.select('B2'),
      'B8':image.select('B8'),
    }
  )
  return image.addBands(Index.rename('Index'))
}
var mask_land=function(image){
  return image.updateMask(mask)
}
var mask_cloud=function(image){
  var clouds=cloud_Prob.lt(10)
  var clouds_buffer=ee.Image(1)
  .cumulativeCost({
  source:cloud_Prob.gt(10),
  maxDistance:cloud_buffer_distance
  }).gt(cloud_buffer_distance).unmask(1);
  return image.updateMask(clouds_buffer)
}
var mask_cloud_prev=function(image){
  var clouds=cloud_Prob_prev.lt(10)
  return image.updateMask(clouds)
}
var S2L2A=S2L2A
.map(add_Index)
.map(mask_land)
.map(mask_cloud)
var S2L2A_prev=S2L2A_prev
.map(mask_land)
.map(mask_cloud_prev)
var buffer_around_port=table.
map(function(feature){
  return feature.buffer(300)
})
var detected_VolcanicRocks=S2L2A
.map(function(image){
  return image.select('Index').gt(-0.1)
}).max()
var num_RockPixels=detected_VolcanicRocks
.reduceRegions({
  collection:buffer_around_port,
  reducer:ee.Reducer.sum(),
  crs:'EPSG:4326',
  scale:10
})
var empty=ee.Image(0)
var fills=empty
.paint({featureCollection:num_RockPixels,color:'sum'})
.clip(buffer_around_port)
Map.setCenter(128,26.7,12)
Map.addLayer(S2L2A_prev,{bands:['B4','B3','B2'],min:0,max:0.2},'Image on 2020/10/26')
Map.addLayer(S2L2A,{bands:['B4','B3','B2'],min:0,max:0.2,},'Image on 2021/10/26')
Map.addLayer(S2L2A.select('Index'),{bands:['Index'],min:-0.1,max:-0.05,palette: ['blue','green','red']},'Possible Volcanic Rocks')
Map.addLayer(table,{color:'white',width:10},'Fishing port')
var palette=['ffffff','ffd700','ffa500','ff8c00','ff7f50','ff4500','dc143c']
var viz={min:0,max:300,palette:palette}
Map.addLayer(fills,viz,'The estimated amount of rocks around a port')
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(viz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(viz.min, {margin: '4px 8px'}),
    ui.Label(
        ((viz.max-viz.min) / 2+viz.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'The number of possible volcanic rock pixels within a 300 m buffer around a port',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);