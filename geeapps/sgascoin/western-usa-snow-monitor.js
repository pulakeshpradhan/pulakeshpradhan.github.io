var c0 = ui.import && ui.import("c0", "imageCollection", {
      "id": "MODIS/006/MOD10A1"
    }) || ee.ImageCollection("MODIS/006/MOD10A1"),
    dem = ui.import && ui.import("dem", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/sgascoin/USSierraSnowMonitor_AOI"
    }) || ee.FeatureCollection("users/sgascoin/USSierraSnowMonitor_AOI"),
    stack1 = ui.import && ui.import("stack1", "image", {
      "id": "users/sgascoin/USSierraSnowMonitor_stack1"
    }) || ee.Image("users/sgascoin/USSierraSnowMonitor_stack1");
var aoi = ee.FeatureCollection(table);
var minSnowDays = 1;
// time period
var t1i = ee.Date('2001-01-01'); // start date image 1 (climatology)
var now = ee.Date(Date.now()); 
var t2i = now.update(null,1,1); // start date image 2 (current year)
//print(t2i)
// load and filter Mod10a1 collection (NDSI from 01 jan 2020 to now)
var c = c0.filterBounds(aoi)
          .filterDate(t2i,now)
          .select('NDSI_Snow_Cover');
// use the latest available image as the end date
var t2f = ee.Date(c.limit(1, 'system:time_start', false).first().get('system:time_start'));
var t1f = t2f.advance(-1,'year'); // end date image 1 
var doyNow = t1f.getRelative('day', 'year');
// date labels
var s1 = ee.String('Period')
         .cat(t1i.format(' MMM-dd').cat(' to ').cat(t1f.format('MMM-dd'))).getInfo();
// color palette 
var p=["fb0000","fbfbfb","0070fb"];
var vis={min:-20, max:20, palette:p}; //doyNow.getInfo()
// Function to convert multiband image to image collection using band names as image timestamp
var BandsToCollection = function(image){
  var collection = ee.ImageCollection.fromImages(image.bandNames().map(function(bandName){
    var d = ee.Date.parse("'b'_y_M_d_'NDSI_Snow_Cover'", ee.String(bandName)).millis();
    return image.select([ee.String(bandName)],['SCA']).set('system:time_start',d);
  }));
  return collection;
};
// load collection 1: precomputed 2001 to 2019 gapfilled binary snow from 1 jan to 1 jun
var c1 = BandsToCollection(stack1); // made with "Snow Monitor (prepare)"
// make image 1: mean SCD from 1 Jan to this DOY over 2001-2019
var im1 = c1
  .filter(
    ee.Filter.dayOfYear(
      t1i.getRelative('day', 'year'), // it's 1
      doyNow))
   .sum()
   .divide(t1f.difference(t1i, 'year')
   .ceil());
// for image 2 we need to recompute the gapfilled binary snow over the current year
var pkg_smooth = require('users/sgascoin/default:pkg_smooth.js');
// interpolate missing data (cloud)
var ci = pkg_smooth.linearInterp(c, 3, -9999).select(['NDSI_Snow_Cover'],['SCA']);
// convert to binary snow cover area
var ca = ci.map(function(image) {
            return image.clip(aoi).gt(20)
            .copyProperties(image, ['system:time_start']);
          });
// make image 2: SCD from 1 Jan thisYear to now
var im2 = ca.sum();
var m1 = im1.gt(minSnowDays);
var m2 = im2.gt(minSnowDays);
var imDiff = im2.subtract(im1).updateMask(m1).updateMask(m2);
// base map style
var mapStyle = require('users/sgascoin/apps:mapStyle');
ui.root.clear();
ui.root.add(ui.Map());
var Map1 = ui.root.widgets().get(0);
Map1.centerObject(aoi,7);
Map1.setOptions('mapStyle', {mapStyle: mapStyle.mapStyle});
Map1.addLayer(ee.Terrain.hillshade(dem),null,'DEM',true,0.2);
Map1.addLayer(imDiff, vis, 'Duration anomaly wrt 2000-2020',true,0.7);
Map1.addLayer(ee.Image().paint(aoi, 1, 1),null,'Bounding box');
// set legend position of panel
var legend = ui.Panel({
  style: {
  position: 'bottom-left',
  padding: '3px 3px'}});
// Create legend title
var legendTitle = ui.Label({
  value: 'Snow duration anomaly (days)',
  style: {
  fontWeight: 'bold',
  margin: '0 0 0 0'}});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lat = ee.Image.pixelLonLat().select('latitude');
var gradient = lat.multiply((vis.max-vis.min)/100.0).add(vis.min);
var legendImage = gradient.visualize(vis);
// create text on top of legend
var panel = ui.Panel({
  widgets: [
  ui.Label(vis['max'])]});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-left'}});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
  widgets: [
  ui.Label(vis['min'])]});
legend.add(panel);
// add legend to left map and date labels
Map1.add(legend);
Map1.add(ui.Label(s1,{position:'top-left'}));
// Set the SplitPanel as the only thing in root.
//ui.root.widgets().reset([splitPanel]);
var snowdem = dem.updateMask(imDiff.gt(0))
  .addBands(dem.updateMask(imDiff.lt(0)))
// histogram options
var hoptions = {
  title: 'Elevation histogram',
  fontSize: 20,
  hAxis: {title: 'Elevation (m)'},
  vAxis: {title: 'Pixels'}
};
// count pixels of 1 ha in 50 m elevation bins
var histogram = ui.Chart.image.histogram(
  snowdem, aoi, 5000, null, 50, null)
  .setSeriesNames(['Positive','Negative'])
  .setOptions(hoptions);
//print(histogram); 
// add current year to climatology
var cf = c1.merge(ca);
// plot time series
var nowDoy = ee.Number.parse(now.format('D'));
var chartSetting = {
    title: 'Current year',
    titleColor:'red',
    vAxis: {'title': 'Snow fraction'},
    hAxis: {'title': 'Days since January 01'},
    series: {
    0: {color: 'dadada'},
    1: {color: 'dadada'},
    2: {color: 'dadada'},
    3: {color: 'dadada'},
    4: {color: 'dadada'},
    5: {color: 'dadada'},
    6: {color: 'dadada'},
    7: {color: 'dadada'},
    8: {color: 'dadada'},
    9: {color: 'dadada'},
    10: {color: 'dadada'},
    11: {color: 'dadada'},
    12: {color: 'dadada'},
    13: {color: 'dadada'},
    14: {color: 'dadada'},
    15: {color: 'dadada'},
    16: {color: 'dadada'},
    17: {color: 'dadada'},
    18: {color: 'dadada'},
    19: {color: 'dadada'},
    20: {color: 'red'},
    },
    legend: {position: 'none'}
};
var ch1 =  ui.Chart.image.doySeriesByYear(
    cf, 'SCA', aoi, ee.Reducer.mean(), 5000, null, 1, 100)
    .setOptions(chartSetting);
var ch2 =  ui.Chart.image.doySeriesByYear(
    cf, 'SCA', aoi, ee.Reducer.mean(), 5000, null, 100, nowDoy)
    .setOptions(chartSetting);
//print(ch1,ch2)
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map1.add(panel);
panel.add(ch1);
//panel.add(ch2);
// Set the SplitPanel as the only thing in root.
//ui.root.widgets().reset([Map1]);