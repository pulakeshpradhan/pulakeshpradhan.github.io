//------------------------INPUT------------------------
//Point location of villages
var orData= ee.FeatureCollection("users/matteojriva/SOMALILAND/baselineVillages")
var bufDist=15    //distance to consider around villages
//Sea mask to remove 
var landMask= ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
//source for ndvi data
var stDate=ee.Date("2010-01-01") //starting date for time series
//module to elaborate timeseries
var landSat = require('users/matteojriva/RS2RPM:LandSatTimeSeriesConstructorV2')
//------------------------FUNCTION------------------------
/*function to remove NON-LAND areas from featureCollection
input: feat - FEATURE (POLYGONE) - feature to clip
       coastLine - FEATURE (POLYGONE) - coastline, polygon
       buf  - INTEGER - distance from coastline (i.e beach) to remove
output: feature
*/
var removeSea=function(feat, coastLine, buf) {
  var clippedGeom=feat.intersection(coastLine.buffer(buf*-1))
  return clippedGeom
}
//------------------------CODE------------------------
//Define study area
var vil= ee.FeatureCollection("users/matteojriva/SOMALILAND/baselineVillages") // load village location
                        // .filterMetadata('check', 'equals', 1)          // include only village with correct location
var stBounds=vil.geometry().bounds().buffer(15000) // study area boundaries
print('clean villages that define study area:', vil)
//Define coast line 
var coastLine=landMask.filterBounds(stBounds).geometry()
                                  .dissolve()
                                  .intersection(stBounds, 1)
//create study area geometry
var stArea=vil.map(function(feat) {
                var clipped=removeSea(feat.buffer(15000), coastLine, 200)
                return clipped.set(feat.toDictionary())
                })
//-------CREATING time series ndvi for study area
var ts=landSat.buildTimeSeries(stArea.geometry().dissolve(), stDate, 30)
//adding property of month and filtering out empty images
var nTs= ts.map(function(img) {
  var month=ee.Date(img.get('system:time_start'))
                                          .format('MM')  //calc month of image
  var bNum=ee.List(img.bandNames()).length()             //band number       
  return img.set({"month": ee.Number.parse(month), 'bnum': bNum})         //add properties
}).filterMetadata('bnum', 'greater_than', 0)             //filter out empty
var meanTs=nTs.mean()
print('time series', nTs)
//----------------------Export and visualize---------------------
Map.centerObject(vil.geometry().bounds())
Map.addLayer(meanTs, {min:0, max:0.3, palette:["red", "yellow", "green"]}, 'Mean NDVI value',1,1)
//Map.addLayer(vil, {palette:['blue']}, 'Studied villages',1, 0.5)
//Add graph with monthly statistics
var graph= require('users/matteojriva/RS2RPM:GraphicExportConstructors')
graph.monthlyStatPanel(nTs, 'month')
//---Add title Panel
var tit=['Somaliland vegetation overview']
var subTit= ['This map displays the vegetation as detected from Satellite images around the villages used for the baseline',
'\n\n Instructions: 1) Be patient! The images take while to appear at the beginning',
      '\n 2) Click on the map (inside the red-yellow-green area) to obtain information on monthly statistics',
      '\n 3) You can download the graph by clicking on the top-right corner',
      '\n 4) Labels and other layers can be made invisible using the "Layers" menu in the top-right corner of the screen',
'\n\n Credits: Dr. Matteo Jucker Riva (HAFL-BFH), matteo.jucker@bfh.ch']
graph.makeTitlePanel(tit, subTit)
//Add labels to villages
graph.drawLabels(vil, 'Name', 'blue', 'survey village')