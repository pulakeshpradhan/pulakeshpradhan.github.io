var dem = ui.import && ui.import("dem", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/sgascoin/PyreneesSnowMonitor_AOI"
    }) || ee.FeatureCollection("users/sgascoin/PyreneesSnowMonitor_AOI"),
    stack1 = ui.import && ui.import("stack1", "image", {
      "id": "users/sgascoin/PyreneesSnowMonitor_stack1_01Nov2000To01Jul2021"
    }) || ee.Image("users/sgascoin/PyreneesSnowMonitor_stack1_01Nov2000To01Jul2021"),
    c0 = ui.import && ui.import("c0", "imageCollection", {
      "id": "MODIS/061/MOD10A1"
    }) || ee.ImageCollection("MODIS/061/MOD10A1");
var aoi = ee.FeatureCollection(table);
var minSnowDays = 1;
// time period
var t1i = ee.Date('2000-11-02'); // start date climatology + 1 day
var now = ee.Date(Date.now()); 
var y = ee.Algorithms.If(
  ee.Number(now.get('month')).gte(11), now.get('year'), now.advance(-1,'year').get('year'));
var t2i = t1i.update(y); // start date image 2 (current year)
var doy1 = t1i.getRelative('day', 'year');
// load and filter Mod10a1 collection 
var c = c0.filterBounds(aoi)
          .filterDate(t2i,now)
          .select('NDSI_Snow_Cover');
// use the latest available image as the end date
var t2f = ee.Date(c.limit(1, 'system:time_start', false).first().get('system:time_start'));
var t1f = t2f.advance(-1,'year'); // end date image 1 
var doyNow = t1f.getRelative('day', 'year');
//print(t1i,t2i,t1f,t2f,doy1,doyNow)
// date labels
var s1 = ee.String('Period')
         .cat(t1i.advance(-1,'days').format(' MMM-dd').cat(' to ').cat(t1f.format('MMM-dd'))).getInfo();
// color palette 
var p=["fb0000","fbfbfb","0070fb"];
var vis={min:-30, max:30, palette:p}; //doyNow.getInfo()
// Function to convert multiband image to image collection using band names as image timestamp
var BandsToCollection = function(image){
  var collection = ee.ImageCollection.fromImages(image.bandNames().map(function(bandName){
    var d = ee.Date.parse("'b'_y_M_d_'NDSI_Snow_Cover'", ee.String(bandName)).millis();
    return image.select([ee.String(bandName)],['SCA']).set('system:time_start',d);
  }));
  return collection;
};
// load collection 1: precomputed gapfilled binary snow cover area
var c1 = BandsToCollection(stack1); // made with "Snow Monitor (prepare)"
// number of water years in climatology
var nyearsClim = t1f.difference(t1i, 'year').ceil();
// make image 1: mean SCD climatology
var im1 = c1
  .filter(ee.Filter.calendarRange(doy1, doyNow, 'day_of_year'))
  .sum()
  .divide(nyearsClim);
// for image 2 we need to recompute the gapfilled binary snow over the current year
var pkg_smooth = require('users/sgascoin/default:pkg_smooth.js');
// interpolate missing data (cloud)
var ci = pkg_smooth.linearInterp(c, 3, -9999).select(['NDSI_Snow_Cover'],['SCA']);
// convert to binary snow cover area
var ca = ci.map(function(image) {
            return image.gt(20)
            // https://developers.google.com/earth-engine/guides/resample
            // Force the next reprojection to aggregate instead of resampling.
            .reduceResolution({
              reducer: ee.Reducer.mode()
              //maxPixels: 128
            })
            // Request the data at the scale and projection of the MODIS image.
            .reproject({
              crs: stack1.projection()
            })
            .copyProperties(image, ['system:time_start']);
          });
// make image 2: SCD from 1 Nov current WY to now
var im2 = ca.sum().clip(aoi);
var m1 = im1.gt(minSnowDays);
var m2 = im2.gt(minSnowDays);
var imDiff = im2.subtract(im1).updateMask(m1).updateMask(m2);
// base map style
var mapStyle = require('users/sgascoin/apps:mapStyle');
ui.root.clear();
ui.root.add(ui.Map());
var Map1 = ui.root.widgets().get(0);
Map1.setCenter(0.5, 42.8, 8);
Map1.setOptions('mapStyle', {mapStyle: mapStyle.mapStyle});
Map1.addLayer(ee.Terrain.hillshade(dem),null,'DEM',true,0.2);
Map1.addLayer(imDiff, vis, 'SCD anomaly wrt 2000-2019',true,0.7);
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
  .addBands(dem.updateMask(imDiff.lt(0)));
// histogram options
var hoptions = {
  title: 'Elevation histogram',
  fontSize: 20,
  hAxis: {title: 'Elevation (m)'},
  vAxis: {title: 'Pixels'}
};
// count pixels of 1 ha in 50 m elevation bins
var histogram = ui.Chart.image.histogram(
  snowdem, aoi, 500, null, 50, null)
  .setSeriesNames(['Positive','Negative'])
  .setOptions(hoptions);
print(histogram); 
// add current year to climatology
var cf = c1.merge(ca);
// plot time series
var nowDoy = ee.Number.parse(now.format('D'));
var chartSetting1 = {
    title: '01 Nov to 31 Dec',
    titleColor:'red',
    colors: ['dadada'],
    vAxis: {'title': 'Snow covered fraction',viewWindow: {min: 0, max: 1}},
    hAxis: {'title': 'Day of year'},
    series: {
    21: {color: 'red'},
    },
    legend: {position: 'none'}
};
var chartTile = ee.String('01 Jan to ')
         .cat(t2f.format('dd MMM yyyy'));
var chartSetting2 = {
    title: chartTile.getInfo(),
    titleColor:'red',
    colors: ['dadada'],
    vAxis: {'title': 'Snow covered fraction',viewWindow: {min: 0, max: 1}},
    hAxis: {'title': 'Day of year'},
    series: {
    21: {color: 'red'},
    },
    legend: {position: 'none'}
};
var ch1 =  ui.Chart.image.doySeriesByYear(
    cf, 'SCA', aoi, ee.Reducer.mean(), 5000, null, doy1, 365)
    .setOptions(chartSetting1);
var ch2 =  ui.Chart.image.doySeriesByYear(
    cf, 'SCA', aoi, ee.Reducer.mean(), 5000, null, 1, nowDoy.max(100))
    .setOptions(chartSetting2);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map1.add(panel);
panel.add(ch1);
panel.add(ch2);
// Set the SplitPanel as the only thing in root.
//ui.root.widgets().reset([Map1]);