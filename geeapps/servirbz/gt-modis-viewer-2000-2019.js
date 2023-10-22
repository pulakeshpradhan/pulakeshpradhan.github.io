/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App that shows MCD43A4 monthly animation, from Jan. 2018 to April 2019
// Domain: Guatemala
// Last updated: 1 May 2019
////////////////////////////////////////////////////////////////////////////////////////////////
var a = require('users/servirbz/packages:borrowed/anim_gena');
var b = require('users/servirbz/packages:mcd43a4_glob1');
var c = require('users/servirbz/packages:bz/bz');
var d = require('users/servirbz/packages:sma_std3');
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
var aoi = c.gt_;
////////////////////////////////////////////////////////////////////////////////////////////////
var dates = ee.List.sequence(0, 19, 1).map(function(offset) {return ee.Date('2000-04-30').advance(offset, 'year')});
function resample(images) {return images.map(function(i) { return i})}
var images = dates.map(function(t) {
  t = ee.Date(t);
  var d = 'YYYY';
  var i = b.mcd43a4_sma_.filterDate(t, t.advance(1, 'year')).median();
  return i.set({label: t.format(d)}).clip(aoi).updateMask(c.msk);
});
////////////////////////////////////////////////////////////////////////////////////////////////
// Animated GIF thumbnail
var startDate = ee.Date.fromYMD(2000, 04, 30);
var numFrames = 20;  // The total number of frames
var windowSize = 1;  // The size of the window
var windowUnit = 'year';  // The units of the window size
var monthIndexList = ee.List.sequence(0, numFrames - 1); // Each frame is associated with an offset in `unit` from `startDate`
// Map a function that converts `index` to a composite image.
var monthlyComposites = monthIndexList.map(
  function makeComposite(index) {
    var step = ee.Number(windowSize).multiply(index);
    var frameStart = startDate.advance(step, windowUnit);
    var frameEnd = frameStart.advance(windowSize, windowUnit);
    // Filter the collection down to [frameStart, frameEnd] and make a composite
    return b.mcd43a4_sma_.filterDate(frameStart, frameEnd).median().clip(aoi).updateMask(c.msk);
  });
var collection = ee.ImageCollection.fromImages(monthlyComposites);
var params = { // Visualization and animation parameters
  //crs: 'EPSG:3857',
  framesPerSecond: 3,
  region: aoi.geometry().bounds(),
  dimensions: 512,
};
//print(ui.Thumbnail(collection, params));
var anim_thumb = ui.Thumbnail(collection, params);
////////////////////////////////////////////////////////////////////////////////////////////////
Map.setOptions('SATELLITE');
Map.centerObject(aoi, 7);
a.animate(images, {label: 'label'});
Map.addLayer(c.bnds_w3,{palette: "white"},"Int'l Borders");
////////////////////////////////////////////////////////////////////////////////////////////////
// UI PANEL
var main = ui.Panel({style: {width: '320px', padding: '8px'}});
var title = ui.Label('Guatemala MODIS image mosaics: 2000-2019*', {fontWeight: 'bold', fontSize: '20px', color: 'darkgreen'});
var descr = ui.Label("Use the play button in the viewer on the right to start animation; you can also zoom in or out.", {color: 'gray'});
var descr2 = ui.Label("* Data are from Jan.to April of each year; the 2019 dry season data are not yet available.", {fontSize: '12px', color: 'maroon'});
var credits = ui.Label('credit: derived from NASA MODIS data', {fontSize: '12px', color: 'gray'});
var branding = ui.Thumbnail({image:c.logo_svr,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'100px',height:'92.5px'}});
/////////
main.add(title);
main.add(descr);
main.add(descr2);
main.add(anim_thumb);
main.add(credits);
main.add(branding);
ui.root.insert(0, main);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////