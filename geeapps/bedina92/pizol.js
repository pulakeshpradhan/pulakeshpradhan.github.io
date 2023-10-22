var text = require('users/gena/packages:text')
var utils = require('users/gena/packages:utils')
var roi = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[9.337126536267874, 46.98909886999308],
          [9.337126536267874, 46.934269537508136],
          [9.463469309705374, 46.934269537508136],
          [9.463469309705374, 46.98909886999308]]], null, false);
Map.centerObject(roi, 13)
/**
 * Function to mask clouds based on the pixel_qa band of Landsat SR data.
 * @param {ee.Image} image Input Landsat SR image
 * @return {ee.Image} Cloudmasked Landsat image
 */
var cloudMaskL457 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
/**
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var addNDSI = function(image) {
  var ndsi = image.normalizedDifference(['B2', 'B5']).rename('NDSI');
  return image.addBands(ndsi);
};        
var collection = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
      .filterBounds(roi)
      //.map(cloudMaskL457)
      .map(addNDSI)
      //.filterDate('1984-06-30'	,	'2011-10-31')
      .select(['B4', 'B5', 'B3', 'NDSI'])
var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
         .filterBounds(roi)
         //.map(cloudMaskL457)
         .map(addNDSI)
         //.filterDate('2000-06-18', '2019-03-03');
         .select(['B4', 'B5', 'B3', 'NDSI'])
var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
         .filterBounds(roi)
         //.map(maskL8sr)
         .map(function(image){
            return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'])
        })
         //.filterDate('2013-08-01', '2019-09-03');
         .map(addNDSI)
         .select(['B4', 'B5', 'B3', 'NDSI'])
var collection8_TOA = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
         .filterBounds(roi)
         .map(function(image){
            return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'])
        })
        .map(function(image){
            return image.multiply(10000)
        })
         //.filterDate('2013-08-01', '2019-09-03');
         /////Cloud?
         .map(addNDSI)
         .select(['B4', 'B5', 'B3', 'NDSI'])         
var full = ee.ImageCollection(	collection.filterDate(	'1984-09-02'	,	'1984-09-03'	).mosaic().set('date', 	'1984-09-02'	).set('sensor', 'Landsat-5')	).merge(
ee.ImageCollection(	collection.filterDate(	'1985-09-21'	,	'1985-09-22'	).mosaic().set('date', 	'1985-09-21'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'1986-09-24'	,	'1986-09-25'	).mosaic().set('date', 	'1986-09-24'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'1989-09-16'	,	'1989-09-17'	).mosaic().set('date', 	'1989-09-16'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'1990-09-19'	,	'1990-09-20'	).mosaic().set('date', 	'1990-09-19'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'1993-09-27'	,	'1993-09-28'	).mosaic().set('date', 	'1993-09-27'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'1998-09-25'	,	'1998-09-26'	).mosaic().set('date', 	'1998-09-25'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'1999-09-12'	,	'1999-09-13'	).mosaic().set('date', 	'1999-09-12'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2002-09-12'	,	'2002-09-13'	).mosaic().set('date', 	'2002-09-12'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2002-09-28'	,	'2002-09-29'	).mosaic().set('date', 	'2002-09-28'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection.filterDate(	'2004-09-09'	,	'2004-09-10'	).mosaic().set('date', 	'2004-09-09'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'2007-09-02'	,	'2007-09-03'	).mosaic().set('date', 	'2007-09-02'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2008-09-28'	,	'2008-09-29'	).mosaic().set('date', 	'2008-09-28'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection.filterDate(	'2009-09-07'	,	'2009-09-08'	).mosaic().set('date', 	'2009-09-07'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection.filterDate(	'2011-09-13'	,	'2011-09-14'	).mosaic().set('date', 	'2011-09-13'	).set('sensor', 'Landsat-5')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2011-09-21'	,	'2011-09-22'	).mosaic().set('date', 	'2011-09-21'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2012-09-07'	,	'2012-09-08'	).mosaic().set('date', 	'2012-09-07'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection8.filterDate(	'2015-09-24'	,	'2015-09-25'	).mosaic().set('date', 	'2015-09-24'	).set('sensor', 'Landsat-8')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2016-09-02'	,	'2016-09-03'	).mosaic().set('date', 	'2016-09-02'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection8.filterDate(	'2016-09-26'	,	'2016-09-27'	).mosaic().set('date', 	'2016-09-26'	).set('sensor', 'Landsat-8')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2017-09-21'	,	'2017-09-22'	).mosaic().set('date', 	'2017-09-21'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2018-09-08'	,	'2018-09-09'	).mosaic().set('date', 	'2018-09-08'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection8.filterDate(	'2019-09-03'	,	'2019-09-04'	).mosaic().set('date', 	'2019-09-03'	).set('sensor', 'Landsat-8')	)).merge(
ee.ImageCollection(	collection7.filterDate(	'2019-09-11'	,	'2019-09-12'	).mosaic().set('date', 	'2019-09-11'	).set('sensor', 'Landsat-7')	)).merge(
ee.ImageCollection(	collection8.filterDate(	'2019-09-19'	,	'2019-09-20'	).mosaic().set('date', 	'2019-09-19'	).set('sensor', 'Landsat-8')	))
var snow = full.select('NDSI').sum()
//Map.addLayer(snow, {}, 'snow')
var nonzero = full.select('NDSI').reduce(ee.Reducer.count())
//print('full', full)
//Map.addLayer(nonzero)
var rate = snow.divide(nonzero).multiply(100)
//var palettes = ee.List(['#ff0000', '#ff1a1a', '#ff3333', '#ff4d4d', '#ff6666', '#ff8080', '#ff9999', '#ffb3b3', '#ffcccc', '#ffffff'])
//var ndsiViz = {min: 0, max: 100, palette: ['#332200', '#664400',  '#996600', ' #cc8800', '#ffb31a', '#ffc34d', '#ffd480', '#ffe6b3', ' #fff7e6' ,'#ffffff']};
var ndsiViz = {min: 0, max: 100, palette: ['#332200',   '#996600',    '#ffd480',  ' #fff7e6' ,'#ffffff']};
//Map.addLayer(rate, ndsiViz, 'NDSI rate')
/*
var images = full.map(function(image){
  return image.visualize({bands: ['B4', 'B5', 'B3'], min: -550, max: 3900});
})
Export.video.toDrive({
  collection: images,
  description: 'Pizol',
  dimensions: 1080,
  framesPerSecond: 1,
  region: roi
});
*/
//var images = full.select(['B4', 'B5', 'B3'])
//make the data 8-bit which is necessary for making a video
var video =  full.map(function(image){
  var start = ee.String(image.get('date'))
  var sensor = ee.String(image.get('sensor'))
  var label = start.cat(ee.String(' ')).cat(sensor)
  return image.visualize({
    forceRgbOutput: true,
    //palette: palettes,
    min: -550,
    max: 3900
  }).clip(roi).set({label: label});
});
print('video', video)
//Map.addLayer(video.first())
// annotate
var annotations = [
  {
    position: 'left', offset: '1%', margin: '1%', property: 'label', scale: Map.getScale() * 3
  }
]
video = video.map(function(image) {
  return text.annotateImage(image, {}, roi, annotations)
})
// add a few layers to map
var animation = require('users/gena/packages:animation')
animation.animate(video, {maxFrames: 200})
//Map.centerObject(aoi, 2)
//Export NDVI from whole study area to video
Export.video.toDrive({
  collection: video,
  description: "Pizol_hamisszines_fPS1_1984-2019_szeptember",    // Filename, no spaces allowed
  framesPerSecond: 1,             // I.e., 1 year / second
  region: roi,
  scale: 30,                     // Scale in m
  });
/*
Map.addLayer(ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
      .filterBounds(roi)
      //.map(cloudMaskL457)
      .map(addNDSI)
      //.filterDate('1984-06-30'	,	'2011-10-31')
      .select(['B4', 'B5', 'B3', 'NDSI']).filterDate(	'1984-09-02'	,	'1984-09-03'	).mosaic().set('date', 	'1984-09-02'	).set('sensor', 'Landsat-5')	)
Map.addLayer(collection.filterDate(	'1984-09-02'	,	'1984-09-03'	).mosaic().set('date', 	'1984-09-02'	).set('sensor', 'Landsat-5')	)
*/