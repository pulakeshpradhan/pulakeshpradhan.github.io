var sent = ee.ImageCollection("COPERNICUS/S2"),
    geometry = /* color: #d63000 */ee.Geometry.Point([-107.4202823638916, 44.60513502085403]),
    vis = {"opacity":1,"bands":["B4","B3","B2"],"min":533.3333333333334,"max":7380.333333333333,"gamma":1.7000000000000002};
Map.setOptions('TERRAIN')
Map.style().set('cursor', 'crosshair');
var panel1 = ui.Panel({style:{width:'250px'}})
ui.root.add(panel1)
var sliderpanel = ui.Panel()
  var slider = ui.Slider({min:1,max:50,value:15})
  var slidertext = ui.Label('Set radius of image window (km)')
  var title = ui.Label({value:'Snow Finder',style:{fontWeight:'bold',fontSize:'20px'}})
  var subtitle = ui.Label({value:'Click anywhere to map most recent image. Use search bar on top to navigate to specific locations.',style:{fontSize:'16px'}})
  sliderpanel.add(slidertext).add(slider)
panel1.add(title).add(subtitle).add(sliderpanel)
var imgnum = 2
Map.onClick(function(coords) {
Map.layers().reset()
panel1.clear()
panel1.add(title).add(subtitle).add(sliderpanel)
var point = ee.Geometry.Point(coords.lon, coords.lat);
var img = sent.filterBounds(point)
.sort('system:index',false).toList(imgnum)
var date = ee.Date(ee.Image(img.get(0)).get('system:time_start')).format()
date.evaluate(function(dater){
var date1 = dater.replace('T','  -  ')
var dateText = ui.Label({value:'Image Collection Date:'
                ,style:{fontWeight:'bold',fontSize:'14px'}})
panel1.add(dateText).add(ui.Label(date1))
})
var imgave = ee.ImageCollection(img).mean()
var dist = ee.Number(slider.getValue()).multiply(1000)
var imgclip =ee.Image(imgave).clip(point.buffer(dist))
var imgMinMax = imgclip.select(['B2','B3','B4']).reduceRegion({
                //geometry:point.buffer(dist),
                reducer:ee.Reducer.minMax(),
                scale:10,
                maxPixels:1e13})
imgMinMax.evaluate(function(minner){
var b2Max = ee.Number(ee.Dictionary(minner).get('B2_max'))
var b2Min = ee.Number(ee.Dictionary(minner).get('B2_min'))
var b3Max = ee.Number(ee.Dictionary(minner).get('B3_max'))
var b3Min = ee.Number(ee.Dictionary(minner).get('B3_min'))
var b4Max = ee.Number(ee.Dictionary(minner).get('B4_max'))
var b4Min = ee.Number(ee.Dictionary(minner).get('B4_min'))
var normB2 = imgclip.select('B2').subtract(b2Min)
                    .divide(ee.Image(b2Max.subtract(b2Min)))
var normB3 = imgclip.select('B3').subtract(b3Min)
                    .divide(ee.Image(b3Max.subtract(b3Min)))
var normB4 = imgclip.select('B4').subtract(b4Min)
                    .divide(ee.Image(b4Max.subtract(b4Min)))
var normImg = normB2.addBands(normB3).addBands(normB4)
var visminmax = {"opacity":1,"bands":["B4","B3","B2"],
                "min":0,"max":1,"gamma":1.7};
Map.addLayer(normImg,visminmax,"SentinelNorm")
})
Map.centerObject(imgclip,12)
})