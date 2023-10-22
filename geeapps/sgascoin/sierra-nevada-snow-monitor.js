var c0 = ui.import && ui.import("c0", "imageCollection", {
      "id": "MODIS/006/MOD10A1"
    }) || ee.ImageCollection("MODIS/006/MOD10A1"),
    dem = ui.import && ui.import("dem", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/sgascoin/SierraNevadaSnowMonitor_AOI"
    }) || ee.FeatureCollection("users/sgascoin/SierraNevadaSnowMonitor_AOI"),
    stack1 = ui.import && ui.import("stack1", "image", {
      "id": "users/sgascoin/SierraNevadaSnowMonitor_stack1"
    }) || ee.Image("users/sgascoin/SierraNevadaSnowMonitor_stack1");
var aoi = ee.FeatureCollection(table);
// time period
var t1i = ee.Date('2001-01-01'); // start date image 1 (climatology)
var t2i = ee.Date('2020-01-01'); // start date image 2 (current year)
var now = ee.Date(Date.now()); 
// load and filter Mod10a1 collection (NDSI from 01 jan 2020 to now)
var c = c0.filterBounds(aoi)
          .filterDate(t2i,now)
          .select('NDSI_Snow_Cover');
// use the latest available image as the end date
var t2f = ee.Date(c.limit(1, 'system:time_start', false).first().get('system:time_start'));
var t1f = t2f.advance(-1,'year'); // end date image 1 
var doyNow = t1f.getRelative('day', 'year');
// date labels
var s1 = ee.String('Average ')
         .cat(t1i.format('MMM-dd').cat(' to ').cat(t1f.format('MMM-dd'))).getInfo();
var s2 = ee.String('2020 ')
         .cat(t2i.format('MMM-dd').cat(' to ').cat(t2f.format('MMM-dd'))).getInfo();
// color palette 
var p=["edf8fb","b3cde3","8c96c6","8856a7","810f7c"];
var vis={min:10, max:doyNow.getInfo(), palette:p};
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
var pkg_smooth = require('users/kongdd/public:Math/pkg_smooth.js');
// interpolate missing data (cloud)
var ci = pkg_smooth.linearInterp(c, 3, -9999).select('NDSI_Snow_Cover');
// convert to binary snow cover area
var ca = ci.map(function(image) {
            return image.clip(aoi).gt(20)
            .copyProperties(image, ['system:time_start']);
          });
// make image 2: SCD from 1 Jan 2020 to now
var im2 = ca.sum();
var m1 = im1.gt(10);
var m2 = im2.gt(10);
// base map style
var mapStyle = require('users/sgascoin/apps:mapStyle');
ui.root.clear();
ui.root.add(ui.Map());
var Map1 = ui.root.widgets().get(0);
Map1.setCenter(-3.12,37.10,9);
Map1.setOptions('mapStyle', {mapStyle: mapStyle.mapStyle});
Map1.addLayer(ee.Terrain.hillshade(dem),null,'DEM',true,0.2);
Map1.addLayer(im1.updateMask(m1), vis, 'SCD Jan-Jun 2000-2019',true,0.7);
Map1.addLayer(ee.Image().paint(aoi, 1, 1),null,'Bounding box')
var Map2 = new ui.Map();
Map2.setOptions('mapStyle', {mapStyle: mapStyle.mapStyle});
Map2.addLayer(ee.Terrain.hillshade(dem),null,'DEM',true,0.2);
Map2.addLayer(im2.updateMask(m2), vis, 'SCD Jan-Jun 2020',true,0.7);
Map2.addLayer(ee.Image().paint(aoi, 1, 1),null,'Bounding box')
// Link the default Map to the other map.
var linker = ui.Map.Linker([Map1, Map2]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = new ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// set legend position of panel
var legend = ui.Panel({
  style: {
  position: 'bottom-left',
  padding: '3px 3px'}});
// Create legend title
var legendTitle = ui.Label({
  value: 'Snow duration (days)',
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
Map2.add(ui.Label(s2,{position:'top-right'}));
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);