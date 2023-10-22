var gswYearly = ee.ImageCollection("JRC/GSW1_3/YearlyHistory");
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level0");
var gaza = gaul.filter(ee.Filter.eq('ADM0_NAME', 'Gaza Strip'))
var geometry = gaza.geometry()
Map.centerObject(geometry, 14)
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000).copyProperties(image, ['system:time_start']);
}
{
var s2 = ee.ImageCollection("COPERNICUS/S2_SR");
var dataset = s2.filter(ee.Filter.date('2021-05-05', '2021-05-16'))
                .filter(ee.Filter.bounds(geometry))
                .map(maskS2clouds)
}     
// User InterFace
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Gaza bomb damage analysis',
  style: {'fontSize': '20px'}
});
mainPanel.add(title)
var author = ui.Label({
  value: 'Created by Santhosh M',
  style: {'fontSize': '14px'},
  targetUrl:'https://www.linkedin.com/in/santhoshm31/'
});
mainPanel.add(author)
var acknowledgement = ui.Label({
  value: 'Inspired from @JamonVDH app',
  style: {'fontSize': '12px'},
  targetUrl:'https://mobile.twitter.com/jamonvdh/status/1395291822142812161'
});
mainPanel.add(acknowledgement)
var div1 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
}})
mainPanel.add(div1)
var subTitle1 = ui.Label({
  value: 'Select change period',
  style: {'fontSize': '14px'}
});
mainPanel.add(subTitle1)
var date = ['2021-05-05','2021-05-10','2021-05-15']
var startDate = ui.Select({
    placeholder: 'From',
    items:date
  })
mainPanel.add(startDate)
var endDate = ui.Select({
    placeholder: 'To',
    items:date
  })
mainPanel.add(endDate)
var div2 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '1px',
  margin: '20px 0px'
}})
mainPanel.add(div2)
var subTitle2 = ui.Label({
  value: 'Select metric for change',
  style: {'fontSize': '14px'}
});
mainPanel.add(subTitle2)
var selectIndex = ui.Select({
    placeholder: 'Index',
    items:['NDVI', 'NBR']
  })
mainPanel.add(selectIndex)
var div3 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '1px',
  margin: '20px 0px'
}})
mainPanel.add(div3)
var subTitle3 = ui.Label({
  value: 'Select change threshold (metric loss)',
  style: {'fontSize': '14px'}
});
mainPanel.add(subTitle3)
var threshold = ui.Slider({min:0, max:0.3, value:0.12, step:0.01, style:{'width':'250px'}})
mainPanel.add(threshold)
var div4 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '1px',
  margin: '20px 0px'
}})
mainPanel.add(div4)
var subTitle4 = ui.Label({
  value: 'Select min & max patch size (m²)',
  style: {'fontSize': '14px'}
});
mainPanel.add(subTitle4)
var minPatch = ui.Slider({min:0, max:2000, value:300, step:100, style:{'width':'250px'}})
mainPanel.add(minPatch)
var maxPatch = ui.Slider({min:1000, max:50000, value:50000, step:1000, style:{'width':'250px'}})
mainPanel.add(maxPatch)
var div5 = ui.Panel({style:{
  backgroundColor: 'F0F0F0',
  height: '2px',
  margin: '20px 0px'
}})
mainPanel.add(div5)
var computeButton = ui.Button({
  label:'compute', 
  onClick:function(){compute()},
  disabled:false, 
  style:{color:'green'}
})
mainPanel.add(computeButton)  
var downloadLabel = ui.Label({
  value:'Download CSV',
  style:{'shown':false}
})
mainPanel.add(downloadLabel)
// 8-11 NBR 
// 8-4 NDVI
function compute() {
var start  = ee.Date(startDate.getValue())
var end = ee.Date(endDate.getValue())
var startData = dataset.filter(ee.Filter.date(start,start.advance(1, 'day'))).median()
var endData = dataset.filter(ee.Filter.date(end,end.advance(1, 'day'))).median()
Map.addLayer(startData.clip(geometry), {min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}, startDate.getValue())
Map.addLayer(endData.clip(geometry), {min: 0, max: 0.4, bands: ['B4', 'B3', 'B2']}, endDate.getValue())
var index = selectIndex.getValue()
var b1 = 'B8'
var b2 = ee.Algorithms.If({
  condition:index == 'NDVI',
  trueCase:'B4',
  falseCase:'B11'})
var indexImage1 = startData.normalizedDifference([b1, b2]).rename(index)
var indexImage2 = endData.normalizedDifference([b1, b2]).rename(index)
var indexThreshold = ee.Number(threshold.getValue());
var indexImage = ee.Image(indexImage1.subtract(indexImage2))
var change = indexImage.gt(indexThreshold)
// Mask Waterbodies using WorldCover
var classification = ee.ImageCollection("ESA/WorldCover/v100").first();
var water = classification.eq(80)
change = change.updateMask(water.not())
Map.addLayer(change.selfMask(), {min:0, max: 1, palette: ['orange']} , 'Detected Change', 0)
var minArea = minPatch.getValue()
var maxArea = maxPatch.getValue()
var pixelArea = ee.Number(10).multiply(ee.Number(10))
var minThreshold = ee.Number(minArea).divide(pixelArea)
var maxThreshold = ee.Number(maxArea).divide(pixelArea)
var connections = change.connectedPixelCount(maxThreshold.add(10))
var bombAreas = change.updateMask(connections.gt(minThreshold).and(connections.lte(maxThreshold)))
Map.centerObject(geometry, 14)
var name = "Potential_bomb_site_using_" + index + "_From_" + startDate.getValue() + "_To_" + endDate.getValue()
Map.addLayer(bombAreas.clip(geometry).selfMask(), {palette:['white', 'red']}, 'Bomber Raster', 0)
var raster = bombAreas.clip(geometry)
var vector = raster.reduceToVectors({
  reducer: ee.Reducer.countEvery(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e10,
  eightConnected: false
})
vector = vector.filter(ee.Filter.eq('label', 1))
function formatCSV(polygon){
  var point = polygon.centroid(1)
  var geom = point.geometry()
  var coord = geom.coordinates();
  var count = point.get('count');
  var area = ee.Number(count).multiply(100);
  return point.set({'lat':coord.get(1), 'lon':coord.get(0), 'area':area});
}
var exportCSV = vector.map(formatCSV);
var url = exportCSV.getDownloadURL({
  format:'CSV',
  selectors:['lat','lon','area'],
  filename:name});
downloadLabel.setUrl(url);
downloadLabel.style().set({'shown':true, 
                           'border':'2px solid black',
                           'fontFamily':'monospace',
                           'padding':'4px',
                           'backgroundColor':'#D3D3D3'
})
var centroids = vector.map(function(f) {
  return f.centroid()
})
Map.addLayer(centroids, {max:1, color: 'cyan'} , 'Detected Site Centroids')
}
ui.root.add(mainPanel);