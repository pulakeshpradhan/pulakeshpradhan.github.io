var table = ee.FeatureCollection("users/matteojriva/pastures/bb"),
    Wachile = /* color: #d63000 */ee.Geometry.Point([39.068348363507084, 4.543270880998165]),
    geometry2 = /* color: #0b4a8b */ee.Geometry.Point([39.30335578973916, 4.516624984838015]),
    dem = ee.Image("USGS/GMTED2010");
/* SCRIPT TO FILTER, CLIP, MASK CLOUDS AND VIDUALIZE LANDSAT IMAGES
NOTES:  
      - Cloud detection is based on automatic classification and external functions
      - Sentinel images ARE NOT surface reflectance
TODO: 
  -Add compositing of images with the same date  <--
  -Add download  multilayer rasters <--
  -Add interpolation for missing data
  -Add resampling to specified resolution
  -Add offset correction to make NDVI values unifrm across satellite types
*/
Map.addLayer(table)
//-----------------PARAMETERS-----------------------
//Region of interest (can be assett)
var geom = Wachile //geometry can be point or polygon
var bufSize = 100000 //buffer size around 'geom' in metres
  //geometry for clipping
  var oGeom=ee.Geometry(ee.Feature(geom).geometry());
  var nGeom = oGeom.buffer(bufSize)
//Dates of interest
var stDate=ee.Date('2017-01-01') //Start date
var enDate=ee.Date('2018-12-01') //End Date
//-----------------INPUT-----------------------
// _SOURCE OF SAT IMAGES
var ls5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR'); //Load landsat 5
var ls7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR'); //Load landsat 7
var ls8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'); //Load landsat 8
//load external functions
//cloud masks
var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
  //function to maks clouds from fitoprincipe/GEE
  var landsatSRfunction = cloud_masks.landsatSR;
//----------------FUNCTIONS---------------------
// filterB(imC, geom)
//desc: filters imagecollection for appropriate boundaries
//input: imC - ImageCollection - image collection to filter
//implicit inputs: nGeom - Geometry - boundaries for filter
//                 dInt - Dates- Date interval for filter    
var filterB = function(imC) {
  var newC=imC.filterBounds(nGeom).filterDate(stDate, enDate);
  var newC2 = newC.set({"system:time_start": imC.get("system:time_start"), "system:index": imC.get("system:index")})
  return(newC2);
}
/* 1.2 mask(img)
 desc: function to mask clouds in landsat 8 images using fitoprincipe/geetools
 INPUT:img - single image with cloud or snow
 output single image with masked clouds shadows and snow */
var maskImg=function(img) {
  var nImg = landsatSRfunction()(img); //if landsat use landsat cloud filtering; //if sentinel use sentinel cloud filtering
  return(nImg);
};
//1.3 clipNorm(img)
//function to clip image around a geometry and calculate normalised difference
//INPUT: img - multispectral image to be clipped and used for ndvi)
//output new image
//implicit parameters
//bands names for normalised difference
//Landsat 5
var b1="B3" //Red band
var b2="B4" //Nir band
var ls5bandList=ee.List([b2, b1])
//Landsat 7 
var b1="B3" //Red band
var b2="B4" //Nir band
var ls7bandList=ee.List([b2, b1])
//Landsat 8
var b1="B4" //Red band
var b2="B5" //Nir band
var ls8bandList=ee.List([b2, b1])
var allBands = ee.Dictionary({'LT05':ls5bandList, 'LE07': ls7bandList,'LC08':ls8bandList});
var clipNorm = function(img) {
  var cImg = img.clip(nGeom)                    //clipping
  var sat = ee.Algorithms.If(img.propertyNames().contains('LANDSAT_ID'), ee.String(img.get('LANDSAT_ID')).split('_').get(0), 'SE2')
  var bList = allBands.get(sat)                     //get different bands based on image id (sat type)
  var ncImg=ee.Image(cImg.normalizedDifference(bList)).float() //normalised difference
  var ncImg2=ncImg.copyProperties(img, ["system:time_start"])
  var ncImg3=ee.Image(ncImg2).rename(["nd"])
  return(ncImg3)
}
/*Function to merge images from the same week, to be mapped over the list of dates for each image
INPUT: date - NUMBER - date in millis. 
        coll: image collection to use for the merging (IMPLICIT)
        mintime: minimum time to consider for the merging, e.fg 3.5 days in both direction for the week
OUTPUT: single image resulting from merging with time as property
*/
var mosImg = function(date) {
  var minDate=ee.Number(date).subtract(minTime); //minimum date to consider
  var maxDate=ee.Number(date).add(minTime); //maximum date to consider
  var singleImage=ee.Image(coll.filterDate(ee.Date(minDate), ee.Date(maxDate)).mean()).set('system:time_start', date);
  var singleImage2=singleImage.set({'system:time_start': date});
  return singleImage2;
};
/* Transform collection in multilayer geoTiff
DESC: change band names to date and sattelite type to export as multi-layer raster
input: img - single image 
output: single img with changed name */
var prepMulti=function(img) {
  var date=ee.Date(img.get('system:time_start')).difference(stDate, 'day').int64()
  var newB=ee.Algorithms.If(img.bandNames().length().gt(0), img.rename([ee.String("B").cat(ee.String(date))]), img)
  return(newB)
}
//----------------CODE---------------------
//1. Select appropriate images
//1.1 Filter images
var fLs5= filterB(ls5, nGeom) //Landsat 5
var fLs7= filterB(ls7, nGeom)
var fLs8= filterB(ls8, nGeom); //Landsat 8 
//1.2 Exclude cloudy and noisy pixels LANDSAT8
var LS5noClouds=fLs5.map(maskImg)
var LS7noClouds=fLs7.map(maskImg)
var LS8noClouds=fLs8.map(maskImg)
print('processing the following images:',
ee.String('landsat5 - ').cat(ee.String(ee.ImageCollection(LS5noClouds).aggregate_count('system:index'))),
ee.String('landsat7 - ').cat(ee.String(LS7noClouds.aggregate_count('system:index'))),
ee.String('landsat8 - ').cat(ee.String(LS8noClouds.aggregate_count('system:index'))));
//1.3 clip image and make ndvi
var LS5NormClip=LS5noClouds.map(clipNorm);
var LS7NormClip=LS7noClouds.map(clipNorm);
var LS8NormClip=LS8noClouds.map(clipNorm);
//2 mosaick images to obtain one image per week
var coll =LS5NormClip.merge(LS7NormClip).merge(LS8NormClip);
 //Prepare list of new dates to mosaic images
 var stNum=stDate.millis()
 var enNum=enDate.millis()
 var dateList =ee.List.sequence(stNum.add(ee.Number(1000*60*60*24*3.5)), enNum, ee.Number(1000*60*60*24*7));
print(ee.String("creating ").cat(ee.String(dateList.length())).cat(" composite images"))
print(ee.String("from: ").cat(stDate.format()))
print(ee.String("to: ").cat(enDate.format()))
  //merging images from all satellites for each week in dateList
var coll=LS7NormClip.merge(LS5NormClip).merge(LS8NormClip) //merging collections from different sattelites
print(coll.map(function(image){return image.rename('nd')}))
var minTime=ee.Number(1000*60*60*24*3.5)                   //defining time-frame for mosaicking
var mergedColl = ee.ImageCollection.fromImages(dateList.map(mosImg))  //mapping function mosImg to dateList to obtain merged images
print("time span considered: ",  minTime.multiply(2),
"images to be merged:", coll,
"resulting collection:", mergedColl
);
/*
//transform collection in multilayer geoTiff
//prepare collection for multilayer export
var readyMulti=mergedColl.map(prepMulti)
print("multilayer raster: ",readyMulti)
var finRast=ee.Image().select()
var finRast=ee.Image(readyMulti.iterate(function(a,b){return ee.Image(b).addBands(ee.Image(a))}, finRast))
print(finRast)
//Exporting image
Export.image.toDrive({
  image: finRast, 
  description: "MergedLANDSATNDVIperWeek", 
  region: nGeom,
  scale: 30, 
  maxPixels:100000000})
*/
//----------------VISUAL AND EXPORT---------------------
//Map
Map.centerObject(nGeom);
//parameters
var minNd= 0.0
var maxNd= 0.8
var ndPal=[ 'd63000', "fffd2d", "359d2b"];
//Map.addLayer(mergedColl.mean(), {min:minNd, max:maxNd, palette: ndPal}, 'mean NDVI value');
//Creating a ui.map to hold visible layers and charts
//var ndLayer=ui.Map.Layer(mergedColl.mean(), {min:minNd, max:maxNd, palette: ndPal}, 'meanNdvi value', true,)
//Dem and Hillshade
 var cDem = dem.clip(nGeom)
 var minVal=ee.Number(cDem.reduceRegion(ee.Reducer.min()).values())
 var nDem=cDem.subtract(ee.Image(minVal))
var hs= ee.Terrain.hillshade(nDem, 270, 40).clip(nGeom)
//var hs2=hs.updateMask(hs.lt(163))
Map.addLayer(hs, {gain:1.5}, "Terrain", true, 1)
//Map.addLayer(hs2, {gain:1.5}, "Terrain", true, 0.6)
Map.addLayer(mergedColl.mean(), {min:minNd, max:maxNd, palette: ndPal}, 'meanNdvi value', true,0.6)
//Chart with corrected and uncorrected images
//build combined collection for ls8 and Se2
/*
var geom=nGeom.buffer(30);
print(ui.Chart.image.series(ee.ImageCollection(LS5NormClip.merge(LS8NormClip)), nGeom.bounds()//PROBLEM HERE
, ee.Reducer.mean(), 30)
.setOptions({title : "Raw and cloud-corrected NDVI values for Landsat 8 and Sentinel 2 ",
vAxis: {title: 'NDVI value'},
hAxis: {title:'date'}
}));
*/
//Add widgets and Panel to show graph and value(s)
var tsGraph=function(coll, geom, name){
  var finChart=ui.Chart.image.series({
  imageCollection: coll, 
  region: geom, 
  reducer:ee.Reducer.mean(),
  scale: 1000, 
  xProperty: "system:time_start",
})
.setOptions({title : name,
vAxis: {title: 'NDVI value'},
hAxis: {title:'date'},
interpolateNulls:true,
trendlines:{
  0:{
    style:'linear',
    color: 'green',
    lineWidth:3,
    //visibleInLegend:true
  }
}
}).setChartType('LineChart');
return finChart
}
var gPanel= ui.Panel({style:{
  width: '400px',
  padding:'4px',
  position:'top-left'
},
})
var genChart=tsGraph(mergedColl, nGeom, "region mean NDVI")
//Add function to update chart with 
gPanel.add(genChart)
Map.add(gPanel)
//------------------TESTING------------
//function to collect values form each image of the collection as list
//var listVal=ee.List(mergedColl.map(colVal))
//print(listVal)
var tMap = ui.Map({style:{position:'bottom-left'}})
tMap.addLayer(hs, {gain:1.5}, "Terrain", true, 1)
tMap.addLayer(mergedColl.mean(), {min:minNd, max:maxNd, palette: ndPal}, 'meanNdvi value', true,0.6)
Map.onClick(function(coords) {
  print(coords)
  gPanel.clear()
  var tMap = ui.Map(coords, {styles:{position:'bottom-left'}})
  tMap.setCenter(coords.lon, coords.lat, 7)
  //tMap.addLayer(hs, {gain:1.5}, "Terrain", true, 1)
  //tMap.addLayer(mergedColl.mean(), {min:minNd, max:maxNd, palette: ndPal}, 'meanNdvi value', true,0.6)
  var point =ee.Geometry.Point(coords.lon, coords.lat);
  var genChart=tsGraph(mergedColl, point, "ndvi at clicked point")
  tMap.addLayer(point)
  gPanel.add(tMap)
  gPanel.add(genChart)
})