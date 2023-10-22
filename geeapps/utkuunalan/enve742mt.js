// First press run 
var a  = Map.onClick(function(coords){
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD");
var date = '2023-03-06'   
var center = [coords["lon"], coords["lat"]];
var zoom = 12;
// UI
//var drawing = ui.Map.DrawingTools()
var cent = {lon: center[0], lat: center[1], zoom: zoom}
ui.root.clear()
var mapSat = ui.Map(cent).setOptions('SATELLITE')
var mapVV = ui.Map(cent)//.add(drawing)
var mapVH = ui.Map(cent)//.add(drawing)
var mapRatio = ui.Map(cent)//.add(drawing)
var link = ui.Map.Linker([mapSat, mapRatio, mapVV, mapVH])
ui.root.clear(mapSat)
ui.root.clear(mapVV)
ui.root.clear(mapVH)
ui.root.clear(mapRatio)
ui.root.add(mapSat)
ui.root.add(mapVV)
ui.root.add(mapVH)
ui.root.add(mapRatio)
/* CORE */
var d = ee.Date(date)
var center = ee.Geometry.Point(center)
var start = d.advance(-1, 'month')
var end = d.advance(1, 'month')
var s1f = s1.filterDate(start, end).filterBounds(center).filter(ee.Filter.contains(".geo", center.buffer(2000)))
var s1i = ee.Image(s1f.first()).convolve(ee.Kernel.square(2));
var s1date = s1i.date().format('y-MM-dd').getInfo()
var s1orb = s1i.get('orbitProperties_pass').getInfo()
var s1vv = s1i.expression("b('VV')").rename('VV')
var s1vh = s1i.expression("b('VH')").rename('VH')
var S1ratio = s1i.expression("b('VV') - b('VH')").rename('VV/VH')
s1i = s1vv.addBands(s1vh).addBands(S1ratio)
var VV_VHvis = {'bands': ['VV', 'VH', 'VV/VH'], min:-50, max:1}
var VVvis = {'bands': ['VV'], min:-50, max:1}
var VHvis = {'bands': ['VH'], min:-50, max:1}
mapRatio.addLayer(s1i, VV_VHvis, 'VV/VH '+s1date)
mapVV.addLayer(s1i, VVvis, 'VV '+s1date)
mapVH.addLayer(s1i, VHvis, 'VH '+s1date)
var Lstyle = {'position': 'bottom-center'}
var VV_VH_Date = ui.Label('RGB Composite (VV, VH, VV/VH) '+s1date, Lstyle)
var VVdateL = ui.Label('VV '+s1date+' ('+s1orb+')', Lstyle)
var VHdateL = ui.Label('VH '+s1date+' ('+s1orb+')', Lstyle)
mapVV.add(VVdateL)
mapRatio.add(VV_VH_Date)
mapVH.add(VHdateL)
})